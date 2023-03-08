import { 
  IsString, 
  IsEmail, 
  IsStrongPassword 
} from "class-validator";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsEmail()
  email: String;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  password: String;
}