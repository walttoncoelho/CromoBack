import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateNumeroDTO } from "./dto/update-numero.dto";
import { NumeroPresenter } from "./numero.presenter";

@Injectable()
export class NumeroService {
  constructor(private readonly prisma: PrismaService) { }

  async present() {
    let numero = await this.show();
    return new NumeroPresenter(numero);
  }

  async show() {
    let numero = await this.prisma.numero.findFirst();
    if (!numero) {
      throw new NotFoundException("Número não encontrado.");
    }
    return numero;
  }

  async update(
    data: UpdateNumeroDTO
  ) {
    let numero = await this.show();
    return await this.prisma.numero.update({
      data,
      where: { id: numero.id }
    });
  }
}