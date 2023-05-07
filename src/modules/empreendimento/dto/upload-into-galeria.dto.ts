import { Transform } from "class-transformer";
import { IsBoolean, IsNumber } from "class-validator";

export class UploadIntoGaleriaDTO {
  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  status: boolean;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  ordemExibicao: number;
}