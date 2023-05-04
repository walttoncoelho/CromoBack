import { IsString } from "class-validator";

export class ConfiguracaoDTO {
  @IsString()
  chave: string;

  @IsString()
  valor: string;
}