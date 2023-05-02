import { Numero } from "@prisma/client";
import { FormatadorValor } from "./util/formatador-valor";

export class NumeroPresenter {
  descricao: string;
  valor: string;

  constructor(
    numero: Numero
  ) {
    this.descricao = numero.descricao;
    this.valor = FormatadorValor.new(numero).formatarNumero();
  }
}