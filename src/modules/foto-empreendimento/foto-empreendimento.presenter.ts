import { FotoEmpreendimento } from "@prisma/client";
import { applicationUrl } from "src/main";

export class FotoEmpreendimentoPresenter {
  imagem: string;

  constructor(
    fotoEmpreendimento: FotoEmpreendimento,
  ) {
    this.imagem = `${applicationUrl}/empreendimentos/${fotoEmpreendimento.empreendimentoId}/galeria/${fotoEmpreendimento.arquivo}`
  }
}