import { Injectable, NotFoundException } from "@nestjs/common";
import { StatusDaConstrucao } from "src/enums/status-da-construcao.enum";
import { PrismaService } from "src/prisma/prisma.service";
import { InfraestruturaService } from "../infraestrutura/infraestrutura.service";
import { CreateEmpreendimentoDTO } from "./dto/create-empreendimento.dto";
import { UpdateEmpreendimentoDTO } from "./dto/update-empreendimento.dto";
import { EmpreendimentoPresenter } from "./empreendimento.presenter";

@Injectable()
export class EmpreendimentoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly infraestruturaService: InfraestruturaService
  ) { }

  async present() {
    let empreendimentos = await this.prisma.empreendimento.findMany({
      where: {
        status: true
      },
    });
    return empreendimentos.map(empreendimento => new EmpreendimentoPresenter(empreendimento));
  }

  async list() {
    let statusSort: object = {
      status: "desc"
    };
    let orderBy = [ 
      statusSort, 
    ];
    let query = { orderBy };
    return await this.prisma.empreendimento.findMany(query);
  }

  async create(data: CreateEmpreendimentoDTO) {
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
      include: { infraestrutura: { include: { infraestrutura: true } } }
    });
    if (!empreendimento)
      throw new NotFoundException("Empreendimento não encontrado.");
    let infraestrutura = empreendimento.infraestrutura.map(pivot => pivot.infraestrutura);
    return { ...empreendimento, infraestrutura };
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

  async addFoto(
    id: number,
    data: {} // AddFotoDTO
  ) {

  }
}