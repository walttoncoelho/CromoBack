import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  Patch,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller("manager/users")
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

  @Get("paginate")
  async paginate(
    @Query("pagina", new DefaultValuePipe(1), ParseIntPipe) pagina: number,
    @Query("usuariosPorPagina", new DefaultValuePipe(25), ParseIntPipe) usuariosPorPagina: number
  ) {
    return await this.userService.paginate(
      pagina,
      usuariosPorPagina
    );
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

  @Patch(":id/toggle-status")
  async status(
    @ParamId() id: number
  ) {
    return await this.userService.toggleStatus(id);
  }
}