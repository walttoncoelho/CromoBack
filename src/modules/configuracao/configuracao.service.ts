import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateConfiguracaoDTO } from "./dto/update-configuracao.dto";

@Injectable()
export class ConfiguracaoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async list() {
    return await this.prisma.configuracao.findMany();
  }

  async show(id: number) {
    let configuracao = await this.prisma.configuracao.findUnique({
      where: { id },
    });
    if (!configuracao)
      throw new NotFoundException("Configuração não encontrada.");
    return configuracao;
  }

  async showByChave(chave: string) {
    let configuracao = await this.prisma.configuracao.findUnique({
      where: { chave },
    });
    if (!configuracao)
      throw new NotFoundException("Configuração não encontrada.");
    return configuracao;
  }

  async update(
    id: number,
    data: UpdateConfiguracaoDTO
  ) {
    let configuracao = await this.show(id);

    return await this.prisma.configuracao.update({
      data,
      where: { id: configuracao.id }
    });
  }

  async updateByChave(
    chave: string,
    data: UpdateConfiguracaoDTO
  ) {
    let configuracao = await this.showByChave(chave);

    return await this.prisma.configuracao.update({
      data,
      where: { id: configuracao.id }
    });
  }
}