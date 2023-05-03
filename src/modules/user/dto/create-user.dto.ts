import { 
  IsString, 
  IsEmail, 
  IsStrongPassword, 
  IsBoolean,
  IsOptional,
  IsEnum,
  MinLength
} from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}