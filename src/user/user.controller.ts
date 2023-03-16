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
    @Body() createUserDTO: CreateUserDTO
  ) {
    return await this.userService.create(createUserDTO);
  }

  @Get()
  async all() {
    return await this.userService.list();
  }

  @Get(":id")
  async show(
    @Param("id", ParseIntPipe) id: number
  ) {
    return await this.userService.show(id);
  }

  @Patch(":id")
  async update(
    @Body() updateUserDTO: UpdateUserDTO, 
    @Param("id", ParseIntPipe) id: number
  ) {
    return await this.userService.update(id, updateUserDTO);
  }
}