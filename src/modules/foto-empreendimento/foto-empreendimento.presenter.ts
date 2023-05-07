import { FotoEmpreendimento } from "@prisma/client";

export class FotoEmpreendimentoPresenter {
  imagem: string;

  constructor(
    fotoEmpreendimento: FotoEmpreendimento,
  ) {
    this.imagem = fotoEmpreendimento.arquivo;
  }
}