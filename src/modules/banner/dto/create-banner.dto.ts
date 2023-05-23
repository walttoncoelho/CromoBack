import { CategoriaDoBanner } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateBannerDTO {
  @Type(() => Boolean)
  @IsBoolean()
  status: boolean;

  @IsEnum(CategoriaDoBanner)
  categoria: CategoriaDoBanner;

  @IsString()
  titulo: string;

  @Type(() => Date)
  @IsDate()
  inicioExibicao: Date;

  @Type(() => Date)
  @IsDate()
  fimExibicao: Date;

  @IsUrl()
  redirectLink: string;

  @Transform((value) => Number(value))
  @IsOptional()
  @IsNumber()
  ordemExibicao: number | null;
}