import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLeadDTO } from "./dto/create-lead.dto";

@Injectable()
export class FaleConoscoService {
  constructor(private readonly prisma: PrismaService) { }

  async list() {
    return await this.prisma.lead.findMany();
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