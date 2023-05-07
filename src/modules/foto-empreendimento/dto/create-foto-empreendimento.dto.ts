import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateFotoEmpreendimentoDTO {
  @IsBoolean()
  status: boolean;

  @IsNumber()
  ordemExibicao: number;

  @IsNumber()
  empreendimentoId: number;

  @IsString()
  arquivo: string;
}