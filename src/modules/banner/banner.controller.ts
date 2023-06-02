import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { BannerService } from "./banner.service";
import { CreateBannerDTO } from "./dto/create-banner.dto";
import { UpdateBannerDTO } from "./dto/update-banner.dto";

@Controller()
export class BannerController {
  constructor(
    private readonly bannerService: BannerService
  ) { }

  @Get("/banners/home")
  async presentHome() {
    return await this.bannerService.present("home");
  }

  @Get("/banners/sobre")
  async present() {
    return await this.bannerService.present("sobre");
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/banners")
  async all(
    @Query("pagina", new DefaultValuePipe(1), ParseIntPipe) pagina: number,
    @Query("bannersPorPagina", new DefaultValuePipe(25), ParseIntPipe) bannersPorPagina: number
  ) {
    return await this.bannerService.list(
      pagina,
      bannersPorPagina
    );
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

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/banner/:id")
  async show(
    @ParamId() bannerId: number,
  ) {
    return await this.bannerService.show(bannerId);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/banner/:id")
  async update(
    @ParamId() bannerId: number,
    @Body() updateBannerDTO: UpdateBannerDTO
  ) {
    return await this.bannerService.update(
      bannerId,
      updateBannerDTO
    );
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