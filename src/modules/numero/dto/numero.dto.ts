import { IsNumber, IsPositive, IsString } from "class-validator";

export class NumeroDTO {
  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsPositive()
  lotes: number;

  @IsNumber()
  @IsPositive()
  asfalto: number;

  @IsNumber()
  @IsPositive()
  rua: number;

  @IsNumber()
  @IsPositive()
  familias: number;
}