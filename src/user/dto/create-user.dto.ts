import { 
  IsString, 
  IsEmail, 
  IsStrongPassword, 
  IsBoolean,
  IsOptional,
  IsEnum
} from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  password: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}