import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { UpdateConfiguracaoDTO } from "./dto/update-configuracao.dto";
import { ConfiguracaoService } from "./configuracao.service";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller("/manager/configuracoes")
export class ConfiguracaoController {

  constructor(
    private readonly configuracaoService: ConfiguracaoService
  ) { }

  @Get()
  async all() {
    return await this.configuracaoService.list();
  }

  @Get(":id")
  async show(
    @ParamId() id: number
  ) {
    return await this.configuracaoService.show(id);
  }

  @Get("/chave/:chave")
  async showByChave(
    @Param() { chave }
  ) {
    return await this.configuracaoService.showByChave(chave);
  }

  @Patch(":id")
  async update(
    @Body() updateConfiguracaoDTO: UpdateConfiguracaoDTO,
    @ParamId() id: number
  ) {
    return await this.configuracaoService.update(id, updateConfiguracaoDTO);
  }

  @Patch("/chave/:chave")
  async updateByChave(
    @Body() updateConfiguracaoDTO: UpdateConfiguracaoDTO,
    @Param() { chave }
  ) {
    return await this.configuracaoService.updateByChave(chave, updateConfiguracaoDTO);
  }
}