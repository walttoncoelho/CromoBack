import { Injectable, NotFoundException } from "@nestjs/common";
import { join } from "path";
import { CategoriaDoBanner } from "src/enums/categoria-do-banner.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { FileService } from "../file/file.service";
import { BannerDTO } from "./dto/banner.dto";
import { CreateBannerDTO } from "./dto/create-banner.dto";
import { UpdateBannerDTO } from "./dto/update-banner.dto";
import { applicationUrl } from "src/main";
import { CategoriaDoBanner as Categoria } from "@prisma/client";
import { BannerPresenter } from "./banner.presenter";

@Injectable()
export class BannerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) { }

  async list(pagina: number | null = null, bannersPorPagina: number | null = null) {
    if (!pagina) pagina = 1;
    if (!bannersPorPagina) bannersPorPagina = 25;

    let contagem = await this.prisma.banner.count();
    let totalDePaginas = Math.ceil(contagem / bannersPorPagina);
    if (pagina > totalDePaginas) {
      throw new NotFoundException("Página inválida");
    }
    let createdAtSort: object = {
      createdAt: "desc"
    };
    let orderBy = [
      createdAtSort,
    ];
    let skip = bannersPorPagina * (pagina - 1);
    let take = bannersPorPagina;
    let query = { orderBy, skip, take };
    let resultados = await this.prisma.banner.findMany(query);
    let banners = resultados.map(resultado => new BannerPresenter(resultado));
    return {
      banners,
      pagina,
      bannersPorPagina,
      totalDePaginas
    }
  }

  async present(secao: string) {
    let categoriasDasSecoes: object = {
      "home": ["HOME_TOPO", "HOME_SECUNDARIO"],
      "sobre": ["SOBRE_TOPO", "SOBRE_SECUNDARIO"]
    };
    let categorias = categoriasDasSecoes[secao];
    let banners = await this.prisma.banner.findMany({
      where: { status: true, categoria: { in: categorias } },
      distinct: ["categoria"],
      orderBy: [{ createdAt: "desc" }]
    });
    let entries = banners.map(banner => [banner.categoria, {
      redirectLink: banner.redirectLink,
      desktop: `${applicationUrl}/banners/${banner.id}/imagem/${banner.desktop}`,
      mobile: `${applicationUrl}/banners/${banner.id}/imagem/${banner.mobile}`,
    }]);
    return Object.fromEntries(entries);
  }

  async create(
    createBannerDTO: CreateBannerDTO,
    desktopImage: Express.Multer.File,
    mobileImage: Express.Multer.File
  ) {
    let data: BannerDTO = {
      ...createBannerDTO,
      desktop: "",
      mobile: "",
    };
    let banner = await this.prisma.banner.create({ data });
    let directory = join("banners", `${banner.id}`);
    await this.update(banner.id, { 
      desktop: await this.fileService.upload(directory, desktopImage), 
      mobile: await this.fileService.upload(directory, mobileImage)
    });
    return await this.show(banner.id);
  }

  async createOptions() {
    let categoriaDoBanner = Object.entries(CategoriaDoBanner).reduce(
      (categoria, categoriaAtual) => [...categoria, { valor: categoriaAtual[0], texto: categoriaAtual[1] }],
      []
    );
    return {
      categoriaDoBanner
    };
  }

  async show(id: number) {
    let banner = await this.prisma.banner.findUnique({
      where: { id },
    });
    if (!banner)
      throw new NotFoundException("Banner não encontrado.");
    let presented = new BannerPresenter(banner);
    return {
      ...banner,
      desktop: presented.desktop,
      mobile: presented.mobile,
    };
  }

  async update(
    id: number,
    updateBannerDTO: UpdateBannerDTO
  ) {
    let banner = await this.show(id);

    return await this.prisma.banner.update({
      data: updateBannerDTO,
      where: { id: banner.id }
    });
  }

  async getImagem(
    id: number,
    file: string
  ) {
    let banner = await this.show(id);
    if (!banner.status)
      throw new NotFoundException("Banner não encontrado.");
    
    let filepath = join("banners", `${banner.id}`, file);
    return await this.fileService.retrieve(filepath);
  }

  async delete(
    id: number
  ) {
    let banner = await this.show(id);

    return await this.prisma.banner.delete({
      where: { id: banner.id }
    });
  }
}