import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Put
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("users")
export class UserController {

  @Post()
  async create(@Body() data: CreateUserDTO) {
    let user = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    return { user };
  }

  @Get()
  async all() {
    let users: [];
    return { users };
  }

  @Get(":id")
  async show(@Param() params) {
    let id = params.id;
    let user = {
      id
    };
    return { user };
  }

  @Put()
  async update(@Body() data, @Param() params) {
    let id = params.id;
    let user = {
      id,
      name: data.name,
      email: data.email,
      password: data.password
    };
    return { user };
  }

}