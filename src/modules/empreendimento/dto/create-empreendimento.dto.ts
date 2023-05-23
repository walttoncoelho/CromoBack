import { StatusDaConstrucao } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateEmpreendimentoDTO {
  @Transform(({ value }) => Boolean(value))
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

  @IsString()
  localizacao: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  lotes: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  areaLote: number;

  @Transform(({ value }) => value.map(Number))
  @IsNumber({}, { each: true })
  infraestruturas: Array<number>;
}