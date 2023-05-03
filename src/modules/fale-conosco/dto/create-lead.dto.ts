import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLeadDTO {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  mensagem: string;

  @IsBoolean()
  newsletter: boolean;

  @IsOptional()
  @IsNumber()
  cidadeId: number | null;
}