import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}