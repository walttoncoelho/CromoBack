import { PartialType } from "@nestjs/mapped-types";
import { ConfiguracaoDTO } from "./configuracao.dto";

export class UpdateConfiguracaoDTO extends PartialType(ConfiguracaoDTO) {
}