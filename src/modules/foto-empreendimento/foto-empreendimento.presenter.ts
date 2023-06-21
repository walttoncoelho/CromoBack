import { FotoEmpreendimento } from "@prisma/client";
import { applicationUrl } from "src/main";

export class FotoEmpreendimentoPresenter {
  id: number;
  imagem: string;

  constructor(
    fotoEmpreendimento: FotoEmpreendimento,
  ) {
    this.id = fotoEmpreendimento.id;
    this.imagem = `${applicationUrl}/empreendimentos/${fotoEmpreendimento.empreendimentoId}/galeria/${fotoEmpreendimento.arquivo}`
  }
}