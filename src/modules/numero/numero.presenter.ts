import { Numero } from "@prisma/client";

export class NumeroPresenter {
  titulo: string;
  descricao: string;
  lotes: number;
  asfalto: number;
  rua: number;
  familias: number;

  constructor(
    numero: Numero
  ) {
    this.titulo = numero.titulo;
    this.descricao = numero.descricao;
    this.lotes = numero.lotes;
    this.asfalto = numero.asfalto;
    this.rua = numero.rua;
    this.familias = numero.familias;
  }
}
