import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFotoEmpreendimentoDTO } from "./dto/create-foto-empreendimento.dto";

@Injectable()
export class FotoEmpreendimentoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createFotoEmpreendimentoDTO: CreateFotoEmpreendimentoDTO
  ) {
    return this.prisma.fotoEmpreendimento.create({ data: createFotoEmpreendimentoDTO });
  }

  async show(id: number) {
    let fotoEmpreendimento = await this.prisma.fotoEmpreendimento.findUnique({
      where: { id },
    });
    if (!fotoEmpreendimento)
      throw new NotFoundException("Foto do Empreendimento não encontrado.");
    return fotoEmpreendimento;
  }

  async toggleStatus(id: number) {
    let fotoEmpreendimento = await this.show(id);

    return await this.prisma.fotoEmpreendimento.update({
      data: { status: !fotoEmpreendimento.status },
      where: { id: fotoEmpreendimento.id }
    });
  }

  async delete(id: number) {
    let fotoEmpreendimento = await this.show(id);

    return await this.prisma.fotoEmpreendimento.delete({
      where: { id: fotoEmpreendimento.id }
    });
  }
}