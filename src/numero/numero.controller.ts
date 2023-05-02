import { 
  Body, 
  Controller, 
  Get, 
  Patch,
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
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
  @Get("/manager/numeros")
  async all() {
    return await this.numeroService.list();
  }

  @Roles(Role.Admin)
  @Get("/manager/numeros/:id")
  async show(
    @ParamId() id: number
  ) {
    return await this.numeroService.show(id);
  }

  @Roles(Role.Admin)
  @Patch("/manager/numeros/:id")
  async update(
    @Body() updateNumeroDTO: UpdateNumeroDTO,
    @ParamId() id: number
  ) {
    return await this.numeroService.update(id, updateNumeroDTO);
  }

  @Roles(Role.Admin)
  @Patch("/manager/numeros/:id/toggle-status")
  async status(
    @ParamId() id: number
  ) {
    return await this.numeroService.toggleStatus(id);
  }
}