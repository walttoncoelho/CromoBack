import { 
  Body, 
  Controller, 
  DefaultValuePipe, 
  Get, 
  ParseIntPipe, 
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
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
import { UpdateInfraestruturaDTO } from "./dto/update-infraestrutura.dto";
import { InfraestruturaService } from "./infraestrutura.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { join } from "path";

@Controller()
export class InfraestruturaController {

  constructor(
    private readonly infraestruturaService: InfraestruturaService,
    private readonly fileService: FileService
  ) { }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/infraestruturas")
  async all(
    @Query("pagina", new DefaultValuePipe(1), ParseIntPipe) pagina: number,
    @Query("infraestruturasPorPagina", new DefaultValuePipe(25), ParseIntPipe) infraestruturasPorPagina: number
  ) {
    return await this.infraestruturaService.paginate(
      pagina,
      infraestruturasPorPagina
    );
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post("/manager/infraestruturas")
  @UseInterceptors(FileInterceptor("icone"))
  async create(
    @Body("titulo") titulo: string,
    @UploadedFile() arquivo: Express.Multer.File
  ) {
    let icone = await this.fileService.upload("infraestrutura", arquivo);
    return await this.infraestruturaService.create({ titulo, icone });
  }

  @Get("/infraestruturas/:id/icone")
  async getIcone(
    @ParamId() id: number,
    @Res() response
  ) {
    let infraestrutura = await this.infraestruturaService.show(id);
    let filepath = join("infraestrutura", infraestrutura.icone);
    let icone = await this.fileService.retrieve(filepath);
    return response.sendFile(icone);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/infraestruturas/:id")
  async show(
    @ParamId() id: number
  ) {
    return await this.infraestruturaService.show(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/infraestruturas/:id")
  async update(
    @Body() updateInfraestruturaDTO: UpdateInfraestruturaDTO,
    @ParamId() id: number
  ) {
    return await this.infraestruturaService.update(id, updateInfraestruturaDTO);
  }
}