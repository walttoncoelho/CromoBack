import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { CreateEmpreendimentoDTO } from "./dto/create-empreendimento.dto";
import { UpdateEmpreendimentoDTO } from "./dto/update-empreendimento.dto";
import { EmpreendimentoService } from "./empreendimento.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { join } from "path";

@Controller()
export class EmpreendimentoController {

  constructor(
    private readonly empreendimentoService: EmpreendimentoService,
    private readonly fileService: FileService
  ) { }

  @Get("/empreendimentos")
  async present() {
    return await this.empreendimentoService.present();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/empreendimentos")
  async all() {
    return await this.empreendimentoService.list();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'logoEmpreendimento', maxCount: 1 },
    { name: 'imagemPlantaBaixa', maxCount: 1 },
  ]))
  @Post("/manager/empreendimentos")
  async create(
    @Body() createEmpreendimentoDTO: CreateEmpreendimentoDTO,
    @UploadedFiles() imagens: { 
      logoEmpreendimento: Express.Multer.File[], 
      imagemPlantaBaixa: Express.Multer.File[] 
    },
  ) {
    let directory = join("empreendimento", createEmpreendimentoDTO.slug);
    return await this.empreendimentoService.create(
      createEmpreendimentoDTO,
      await this.fileService.upload(directory, imagens.logoEmpreendimento[0]),
      await this.fileService.upload(directory, imagens.imagemPlantaBaixa[0])
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/empreendimento/create-options")
  async createOptions() {
    return await this.empreendimentoService.createOptions();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/empreendimentos/:id")
  async show(
    @ParamId() id: number
  ) {
    return await this.empreendimentoService.show(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/empreendimentos/:id")
  async update(
    @Body() updateEmpreendimentoDTO: UpdateEmpreendimentoDTO,
    @ParamId() id: number
  ) {
    return await this.empreendimentoService.update(id, updateEmpreendimentoDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/empreendimentos/:id/toggle-status")
  async status(
    @ParamId() id: number
  ) {
    return await this.empreendimentoService.toggleStatus(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete("/manager/empreendimentos/:id")
  async delete(
    @ParamId() id: number
  ) {
    return await this.empreendimentoService.delete(id);
  }
}