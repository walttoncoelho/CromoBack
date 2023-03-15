import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Patch,
  ParseIntPipe
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  async create(
    @Body() userDTO: CreateUserDTO
  ) {
    return await this.userService.create(userDTO);
  }

  @Get()
  async all() {
    let users: [];
    return { users };
  }

  @Get(":id")
  async show(
    @Param("id", ParseIntPipe) id: Number
  ) {
    let user = {
      id
    };
    return { user };
  }

  @Patch(":id")
  async update(
    @Body() { email, name, password, status }: UpdateUserDTO, 
    @Param("id", ParseIntPipe) id: Number
  ) {
    let user = {
      id,
      name,
      email,
      password,
      status,
    };
    return { user };
  }
}