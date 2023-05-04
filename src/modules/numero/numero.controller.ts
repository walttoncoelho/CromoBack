import { 
  Body, 
  Controller, 
  Get, 
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
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
  async show() {
    return await this.numeroService.show();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/numeros")
  async update(
    @Body() updateNumeroDTO: UpdateNumeroDTO
  ) {
    return await this.numeroService.update(updateNumeroDTO);
  }
}