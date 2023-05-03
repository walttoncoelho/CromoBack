import { Numero } from "@prisma/client";

export class FormatadorValor {
  constructor(protected readonly numero: Numero) { }

  public static new(numero: Numero): FormatadorValor {
    return new FormatadorValor(numero);
  }

  public formatarNumero(): string {
    let formato = this.numero.formato;
    let valor = this.numero.valor;

    if (formato === "EXATO") {
      return `${this.valorFormatado(valor)}`;
    }
    else if (formato === "APROXIMADO") {
      return `+${this.valorFormatado(Math.floor(valor / 10) * 10)}`;
    }
    else if (formato === "DISTANCIA") {
      return `${this.valorFormatado(valor)}km`;
    }
    else {
      return `R$ ${this.valorFormatado(valor)}`;
    }
  }

  private valorFormatado(valor: number): string {
    return new Intl.NumberFormat("pt-BR").format(valor);
  }
}