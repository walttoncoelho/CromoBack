import { 
  Body, 
  Controller, 
  Get, 
  Post,
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { CreateLeadDTO } from "./dto/create-lead.dto";
import { FaleConoscoService } from "./fale-conosco.service";

@Controller("/manager/leads")
export class FaleConoscoController {

  constructor(
    private readonly faleConoscoService: FaleConoscoService
  ) { }

  @Roles(Role.Admin)
  @Get()
  async all() {
    return await this.faleConoscoService.list();
  }

  @Post()
  async create(
    @Body() createLeadDTO: CreateLeadDTO
  ) {
    return await this.faleConoscoService.create(createLeadDTO);
  }

  @Roles(Role.Admin)
  @Get(":id")
  async show(
    @ParamId() id: number
  ) {
    return await this.faleConoscoService.show(id);
  }
}