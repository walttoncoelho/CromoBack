import { IsString } from "class-validator";

export class ConfiguracaoDTO {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsString()
  valor: string;
}