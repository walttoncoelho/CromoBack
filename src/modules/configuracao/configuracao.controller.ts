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

@Controller()
export class ConfiguracaoController {

  constructor(
    private readonly configuracaoService: ConfiguracaoService
  ) { }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/configuracoes")
  async all() {
    return await this.configuracaoService.list();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/configuracoes/:id")
  async show(
    @ParamId() id: number
  ) {
    return await this.configuracaoService.show(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Get("/manager/configuracoes/chave/:chave")
  async showByChave(
    @Param() { chave }
  ) {
    return await this.configuracaoService.showByChave(chave);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/configuracoes/:id")
  async update(
    @Body() updateConfiguracaoDTO: UpdateConfiguracaoDTO,
    @ParamId() id: number
  ) {
    return await this.configuracaoService.update(id, updateConfiguracaoDTO);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch("/manager/configuracoes/chave/:chave")
  async updateByChave(
    @Body() updateConfiguracaoDTO: UpdateConfiguracaoDTO,
    @Param() { chave }
  ) {
    return await this.configuracaoService.updateByChave(chave, updateConfiguracaoDTO);
  }

  @Get("instagram")
  async instagram() {
    let instagram = await this.configuracaoService.showByChave("instagram_account");
    return {
      titulo: instagram.titulo,
      descricao: instagram.descricao,
      link: instagram.valor
    };
  }

  @Get("facebook")
  async facebook() {
    let facebook = await this.configuracaoService.showByChave("facebook_account");
    return {
      titulo: facebook.titulo,
      descricao: facebook.descricao,
      link: facebook.valor
    }
  }
}