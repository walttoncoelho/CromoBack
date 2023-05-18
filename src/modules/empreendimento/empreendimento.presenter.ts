import { Empreendimento } from "@prisma/client";
import { StatusDaConstrucao } from "src/enums/status-da-construcao.enum";
import { applicationUrl } from "src/main";
import { FotoEmpreendimentoPresenter } from "../foto-empreendimento/foto-empreendimento.presenter";
import { InfraestruturaPresenter } from "../infraestrutura/infraestrutura.presenter";

export class EmpreendimentoPresenter {
  id: number;
  status: boolean;
  statusDaConstrucao: string;
  titulo: string;
  descricao: string;
  tipoEmpreendimento: string;
  slug: string;
  lotes: number;
  areaLote: number;
  logoEmpreendimento: string;
  imagemPlantaBaixa: string;
  infraestrutura: Array<InfraestruturaPresenter>;
  galeria: Array<FotoEmpreendimentoPresenter>;

  constructor(
    empreendimento: Empreendimento,
    infraestrutura: Array<InfraestruturaPresenter>,
    galeria: Array<FotoEmpreendimentoPresenter>
  ) {
    this.id = empreendimento.id;
    this.status = empreendimento.status;
    this.statusDaConstrucao = StatusDaConstrucao[empreendimento.statusDaConstrucao];
    this.titulo = empreendimento.titulo;
    this.descricao = empreendimento.descricao;
    this.tipoEmpreendimento = empreendimento.tipoEmpreendimento;
    this.slug = empreendimento.slug;
    this.lotes = empreendimento.lotes;
    this.areaLote = empreendimento.areaLote;
    this.logoEmpreendimento = `${applicationUrl}/empreendimentos/${empreendimento.id}/imagem/${empreendimento.logoEmpreendimento}`;
    this.imagemPlantaBaixa = `${applicationUrl}/empreendimentos/${empreendimento.id}/imagem/${empreendimento.imagemPlantaBaixa}`;
    this.infraestrutura = infraestrutura;
    this.galeria = galeria;
  }
}