import { FormatoNumero } from "@prisma/client";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateNumeroDTO {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsBoolean()
  status: boolean;

  @IsEnum(FormatoNumero)
  formato: FormatoNumero;

  @IsOptional()
  @IsNumber()
  ordemExibicao: number | null;
}