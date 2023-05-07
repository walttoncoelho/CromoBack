import { Infraestrutura } from "@prisma/client";

export class InfraestruturaPresenter {
  id: number;
  icone: string;
  titulo: string;

  constructor(
    infraestrutura: Infraestrutura,
  ) {
    this.id = infraestrutura.id;
    this.icone = infraestrutura.icone;
    this.titulo = infraestrutura.titulo;
  }
}