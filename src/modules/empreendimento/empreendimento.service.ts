import { Injectable, NotFoundException } from "@nestjs/common";
import { StatusDaConstrucao } from "src/enums/status-da-construcao.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFotoEmpreendimentoDTO } from "../foto-empreendimento/dto/create-foto-empreendimento.dto";
import { FotoEmpreendimentoPresenter } from "../foto-empreendimento/foto-empreendimento.presenter";
import { FotoEmpreendimentoService } from "../foto-empreendimento/foto-empreendimento.service";
import { InfraestruturaPresenter } from "../infraestrutura/infraestrutura.presenter";
import { InfraestruturaService } from "../infraestrutura/infraestrutura.service";
import { CreateEmpreendimentoDTO } from "./dto/create-empreendimento.dto";
import { UpdateEmpreendimentoDTO } from "./dto/update-empreendimento.dto";
import { EmpreendimentoPresenter } from "./empreendimento.presenter";

@Injectable()
export class EmpreendimentoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infraestruturaService: InfraestruturaService,
    private readonly fotoEmpreendimentoService: FotoEmpreendimentoService
  ) { }

  async present() {
    let empreendimentos = await this.prisma.empreendimento.findMany({
      where: {
        status: true
      },
      include: {
        infraestrutura: { include: { infraestrutura: true } },
        galeria: { where:  { status: true } }
      }
    });
    return empreendimentos.map(empreendimento => {
      let infraestrutura = empreendimento.infraestrutura.map(pivot => new InfraestruturaPresenter(pivot.infraestrutura));
      let galeria = empreendimento.galeria.map(foto => new FotoEmpreendimentoPresenter(foto));
      return new EmpreendimentoPresenter(empreendimento, infraestrutura, galeria);
    });
  }

  async list(pagina: number | null = null, empreendimentosPorPagina: number | null = null) {
    if (!pagina) pagina = 1;
    if (!empreendimentosPorPagina) empreendimentosPorPagina = 25;

    let contagem = await this.prisma.empreendimento.count();
    let totalDePaginas = Math.ceil(contagem / empreendimentosPorPagina);
    if (pagina > totalDePaginas) {
      throw new NotFoundException("Página inválida");
    }
    let statusSort: object = {
      status: "desc"
    };
    let orderBy = [ 
      statusSort, 
    ];
    let skip = empreendimentosPorPagina * (pagina - 1); 
    let take = empreendimentosPorPagina;
    let query = { orderBy, skip, take };
    let empreendimentos = await this.prisma.empreendimento.findMany(query);
    return {
      empreendimentos,
      pagina,
      empreendimentosPorPagina,
      totalDePaginas
    }
  }

  async create(
    data: CreateEmpreendimentoDTO,
    logoEmpreendimento: string,
    imagemPlantaBaixa: string
  ) {
    let { infraestruturas, ...dados } = data;
    let vinculoInfraestrutura = infraestruturas.map(infraestruturaId => { return { 
      infraestrutura: { 
        connect: { 
          id: infraestruturaId 
        } 
      }
    }});
    return await this.prisma.empreendimento.create({ 
      data: {
        ...dados,
        logoEmpreendimento,
        imagemPlantaBaixa,
        infraestrutura: {
          create: vinculoInfraestrutura
        }
      } 
    });
  }

  async createOptions() {
    let statusDaConstrucao = Object.entries(StatusDaConstrucao).reduce(
      (status, statusAtual) => [...status, { valor: statusAtual[0], texto: statusAtual[1] }],
      []
    );
    let infraestruturas = await this.infraestruturaService.list();
    return {
      statusDaConstrucao,
      infraestruturas
    };
  }

  async show(id: number) {
    let empreendimento = await this.prisma.empreendimento.findUnique({
      where: { id },
    });
    if (!empreendimento)
      throw new NotFoundException("Empreendimento não encontrado.");
    return empreendimento;
  }

  async update(
    id: number,
    data: UpdateEmpreendimentoDTO
  ) {
    let empreendimento = await this.show(id);

    return await this.prisma.empreendimento.update({
      data,
      where: { id: empreendimento.id }
    });
  }

  async toggleStatus(id: number) {
    let empreendimento = await this.show(id);

    return await this.prisma.empreendimento.update({
      data: { status: !empreendimento.status },
      where: { id: empreendimento.id }
    });
  }

  async delete(id: number) {
    let empreendimento = await this.show(id);

    return await this.prisma.empreendimento.delete({
      where: { id: empreendimento.id }
    });
  }

  async uploadIntoGaleria(
    createFotoEmpreendimentoDTO: CreateFotoEmpreendimentoDTO
  ) {
    return await this.fotoEmpreendimentoService.create(createFotoEmpreendimentoDTO);
  }
}