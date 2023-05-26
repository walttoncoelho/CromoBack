import { Banner } from "@prisma/client";
import { CategoriaDoBanner } from "src/enums/categoria-do-banner.enum";
import { applicationUrl } from "src/main";

export class BannerPresenter {
  id: number;
  status: boolean;
  categoria: string;
  titulo: string;
  redirectLink: string;
  desktop: string;
  mobile: string;
  createdAt: Date;

  constructor(
    banner: Banner,
  ) {
    this.id = banner.id;
    this.status = banner.status;
    this.categoria = CategoriaDoBanner[banner.categoria];
    this.titulo = banner.titulo;
    this.redirectLink = banner.redirectLink;
    this.desktop = `${applicationUrl}/banners/${banner.id}/imagem/${banner.desktop}`;
    this.mobile = `${applicationUrl}/banners/${banner.id}/imagem/${banner.mobile}`;
    this.createdAt = banner.createdAt;
  }
}