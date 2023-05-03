import { StatusDaConstrucao } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateEmpreendimentoDTO {
  @IsBoolean()
  status: boolean;

  @IsEnum(StatusDaConstrucao)
  statusDaConstrucao: StatusDaConstrucao;

  @IsString()
  titulo: string;

  @IsString()
  descricao: string;

  @IsString()
  tipoEmpreendimento: string;

  @IsString()
  slug: string;

  @IsNumber()
  @IsPositive()
  lotes: number;

  @IsNumber()
  @IsPositive()
  areaLote: number;

  @IsString()
  logoEmpreendimento: string;

  @IsString()
  imagemPlantaBaixa: string;

  @IsArray()
  infraestruturas: Array<number>;
}