import { IsString } from "class-validator";

export class CreateInfraestruturaDTO {
  @IsString()
  icone: string;

  @IsString()
  titulo: string;
}