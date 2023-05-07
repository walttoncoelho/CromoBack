import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { BannerService } from "./banner.service";
import { CreateBannerDTO } from "./dto/create-banner.dto";

@Controller()
export class BannerController {
  constructor(
    private readonly bannerService: BannerService
  ) { }

  @Get("/banners")
  async present() {
    return await this.bannerService.present();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/banners")
  async all() {
    return await this.bannerService.list();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'desktop', maxCount: 1 },
    { name: 'mobile', maxCount: 1 },
  ]))
  @Post("/manager/banners")
  async create(
    @Body() createBannerDTO: CreateBannerDTO,
    @UploadedFiles() imagens: {
      desktop: Express.Multer.File[],
      mobile: Express.Multer.File[]
    },
  ) {
    return await this.bannerService.create(
      createBannerDTO,
      imagens.desktop[0],
      imagens.mobile[0]
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/banners/create-options")
  async createOptions() {
    return await this.bannerService.createOptions();
  }

  @Get("/banners/:id/imagem/:arquivo")
  async getImagem(
    @ParamId() bannerId: number,
    @Param("arquivo") banner: string,
    @Res() response
  ) {
    let arquivo = await this.bannerService.getImagem(bannerId, banner);
    return response.sendFile(arquivo);
  }
}