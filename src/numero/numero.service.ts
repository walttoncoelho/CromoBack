import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateNumeroDTO } from "./dto/update-numero.dto";
import { NumeroPresenter } from "./numero.presenter";

@Injectable()
export class NumeroService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    let numeros = await this.prisma.numero.findMany({
      where: {
        status: true
      },
      orderBy: {
        ordemExibicao: { 
          sort: "asc",
          nulls: "last"
        } 
      },
      take: 4,
    });
    return numeros.map(numero => new NumeroPresenter(numero));
  }

  async show(id: number) {
    let numero = await this.prisma.numero.findUnique({
      where: { id }
    });
    if (!numero)
      throw new NotFoundException("Número não encontrado.");
    return numero;
  }

  async update(
    id: number,
    data: UpdateNumeroDTO
  ) {
    let numero = await this.show(id);

    return await this.prisma.numero.update({
      data,
      where: { id: numero.id }
    });
  }

  async toggleStatus(id: number) {
    let numero = await this.show(id);

    return await this.prisma.numero.update({
      data: { status: !numero.status },
      where: { id: numero.id }
    });
  }
}