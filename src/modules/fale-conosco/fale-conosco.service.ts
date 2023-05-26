import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLeadDTO } from "./dto/create-lead.dto";

@Injectable()
export class FaleConoscoService {
  constructor(private readonly prisma: PrismaService) { }

  async list(pagina: number | null = null, leadsPorPagina: number | null = null) {
    if (!pagina) pagina = 1;
    if (!leadsPorPagina) leadsPorPagina = 25;

    let contagem = await this.prisma.lead.count();
    let totalDePaginas = Math.ceil(contagem / leadsPorPagina);
    if (pagina > totalDePaginas) {
      throw new NotFoundException("Página inválida");
    }
    let createdAtSort: object = {
      createdAt: "desc"
    };
    let orderBy = [
      createdAtSort,
    ];
    let skip = leadsPorPagina * (pagina - 1);
    let take = leadsPorPagina;
    let query = { orderBy, skip, take };
    let leads = await this.prisma.lead.findMany(query);
    return {
      leads,
      pagina,
      leadsPorPagina,
      totalDePaginas
    }
  }

  async create(data: CreateLeadDTO) {
    return await this.prisma.lead.create({ data });
  }

  async show(id: number) {
    let lead = await this.prisma.lead.findUnique({
      where: { id }
    });
    if (!lead)
      throw new NotFoundException("Lead não encontrado.");
    return lead;
  }
}