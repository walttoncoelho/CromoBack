import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateInfraestruturaDTO } from "./dto/create-infraestrutura.dto";
import { UpdateInfraestruturaDTO } from "./dto/update-infraestrutura.dto";

@Injectable()
export class InfraestruturaService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async list() {
    return await this.prisma.infraestrutura.findMany();
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