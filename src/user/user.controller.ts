import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Patch,
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO
  ) {
    return await this.userService.create(createUserDTO);
  }

  @Roles(Role.Admin)
  @Get()
  async all() {
    return await this.userService.list();
  }

  @Roles(Role.Admin)
  @Get(":id")
  async show(
    @ParamId() id: number
  ) {
    return await this.userService.show(id);
  }

  @Roles(Role.Admin)
  @Patch(":id")
  async update(
    @Body() updateUserDTO: UpdateUserDTO,
    @ParamId() id: number
  ) {
    return await this.userService.update(id, updateUserDTO);
  }

  @Roles(Role.Admin)
  @Patch(":id/toggle-status")
  async status(
    @ParamId() id: number
  ) {
    return await this.userService.toggleStatus(id);
  }
}