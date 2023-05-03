import { 
  Body, 
  Controller, 
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
import { CreateInfraestruturaDTO } from "./dto/create-infraestrutura.dto";
import { UpdateInfraestruturaDTO } from "./dto/update-infraestrutura.dto";
import { InfraestruturaService } from "./infraestrutura.service";

@Controller()
export class InfraestruturaController {

  constructor(
    private readonly infraestruturaService: InfraestruturaService
  ) { }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/infraestruturas")
  async all() {
    return await this.infraestruturaService.list();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post("/manager/infraestruturas")
  async create(
    @Body() createInfraestruturaDTO: CreateInfraestruturaDTO
  ) {
    return await this.infraestruturaService.create(createInfraestruturaDTO);
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