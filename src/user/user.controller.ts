import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Patch,
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ToggleUserStatusDTO } from "./dto/toggle-user-status.dto";
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
    @ParamId() id: number
  ) {
    return await this.userService.show(id);
  }

  @Patch(":id")
  async update(
    @Body() updateUserDTO: UpdateUserDTO,
    @ParamId() id: number
  ) {
    return await this.userService.update(id, updateUserDTO);
  }

  // @Patch(":id/status")
  // async status(
  //   @Body() toggleUserStatusDTO: ToggleUserStatusDTO,
  //   @ParamId() id: number
  // ) {
  //   return await this.userService.toggleStatus(id, updateUserDTO);
  // }
}