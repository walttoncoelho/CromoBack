import { Infraestrutura } from "@prisma/client";
import { applicationUrl } from "src/main";

export class InfraestruturaPresenter {
  id: number;
  icone: string;
  titulo: string;
  createdAt: Date;

  constructor(
    infraestrutura: Infraestrutura,
  ) {
    this.id = infraestrutura.id;
    this.icone = `${applicationUrl}/infraestruturas/${infraestrutura.id}/icone`
    this.titulo = infraestrutura.titulo;
    this.createdAt = infraestrutura.createdAt;
  }
}