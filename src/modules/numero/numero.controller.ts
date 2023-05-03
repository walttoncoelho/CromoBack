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
import { CreateNumeroDTO } from "./dto/create-numero.dto";
import { UpdateNumeroDTO } from "./dto/update-numero.dto";
import { NumeroService } from "./numero.service";

@Controller()
export class NumeroController {

  constructor(
    private readonly numeroService: NumeroService
  ) { }

  @Get("/numeros")
  async present() {
    return await this.numeroService.present();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/numeros")
  async all() {
    return await this.numeroService.list();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post("/manager/numeros")
  async create(
    @Body() createNumeroDTO: CreateNumeroDTO
  ) {
    return await this.numeroService.create(createNumeroDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/numeros/:id")
  async show(
    @ParamId() id: number
  ) {
    return await this.numeroService.show(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/numeros/:id")
  async update(
    @Body() updateNumeroDTO: UpdateNumeroDTO,
    @ParamId() id: number
  ) {
    return await this.numeroService.update(id, updateNumeroDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/numeros/:id/toggle-status")
  async status(
    @ParamId() id: number
  ) {
    return await this.numeroService.toggleStatus(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete("/manager/numeros/:id")
  async delete(
    @ParamId() id: number
  ) {
    return await this.numeroService.delete(id);
  }
}