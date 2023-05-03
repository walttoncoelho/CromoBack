import { PartialType } from "@nestjs/mapped-types";
import { CreateInfraestruturaDTO } from "./create-infraestrutura.dto";

export class UpdateInfraestruturaDTO extends PartialType(CreateInfraestruturaDTO) {

}