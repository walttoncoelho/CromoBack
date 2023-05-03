import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { CreateEmpreendimentoDTO } from "./dto/create-empreendimento.dto";
import { UpdateEmpreendimentoDTO } from "./dto/update-empreendimento.dto";
import { EmpreendimentoService } from "./empreendimento.service";

@Controller()
export class EmpreendimentoController {

  constructor(
    private readonly empreendimentoService: EmpreendimentoService
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
  @Post("/manager/empreendimentos")
  async create(
    @Body() createEmpreendimentoDTO: CreateEmpreendimentoDTO
  ) {
    return await this.empreendimentoService.create(createEmpreendimentoDTO);
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