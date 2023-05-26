import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateInfraestruturaDTO } from "./dto/create-infraestrutura.dto";
import { UpdateInfraestruturaDTO } from "./dto/update-infraestrutura.dto";
import { InfraestruturaPresenter } from "./infraestrutura.presenter";

@Injectable()
export class InfraestruturaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async list() {
    return await this.prisma.infraestrutura.findMany();
  }

  async paginate(pagina: number | null = null, infraestruturasPorPagina: number | null = null) {
    if (!pagina) pagina = 1;
    if (!infraestruturasPorPagina) infraestruturasPorPagina = 25;

    let contagem = await this.prisma.infraestrutura.count();
    let totalDePaginas = Math.ceil(contagem / infraestruturasPorPagina);
    if (pagina > totalDePaginas) {
      throw new NotFoundException("Página inválida");
    }
    let createdAtSort: object = {
      createdAt: "desc"
    };
    let orderBy = [
      createdAtSort,
    ];
    let skip = infraestruturasPorPagina * (pagina - 1);
    let take = infraestruturasPorPagina;
    let query = { orderBy, skip, take };
    let resultados = await this.prisma.infraestrutura.findMany(query);
    let infraestruturas = resultados.map(resultado => new InfraestruturaPresenter(resultado));
    return {
      infraestruturas,
      pagina,
      infraestruturasPorPagina,
      totalDePaginas
    }
  }

  async create(data: CreateInfraestruturaDTO) {
    return await this.prisma.infraestrutura.create({ data });
  }

  async show(id: number) {
    let infraestrutura = await this.prisma.infraestrutura.findUnique({
      where: { id }
    });
    if (!infraestrutura)
      throw new NotFoundException("Infraestrutura não encontrada.");
    return infraestrutura;
  }

  async update(
    id: number,
    data: UpdateInfraestruturaDTO
  ) {
    let infraestrutura = await this.show(id);

    return await this.prisma.infraestrutura.update({
      data,
      where: { id: infraestrutura.id }
    });
  }
}