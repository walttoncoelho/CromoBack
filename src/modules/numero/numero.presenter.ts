import { Numero } from "@prisma/client";

export class NumeroPresenter {
  titulo: string;
  descricao: string;
  lotes: string;
  asfalto: string;
  rua: string;
  familias: string;

  constructor(
    numero: Numero
  ) {
    this.titulo = numero.titulo;
    this.descricao = numero.descricao;
    this.lotes = `${numero.lotes}`;
    this.asfalto = `${numero.asfalto}`;
    this.rua = `${numero.rua}`;
    this.familias = `${numero.familias}`;
  }
}