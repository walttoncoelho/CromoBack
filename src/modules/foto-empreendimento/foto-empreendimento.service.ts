import { Injectable } from "@nestjs/common";
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
}