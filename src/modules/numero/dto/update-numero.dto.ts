import { PartialType } from "@nestjs/mapped-types";
import { CreateNumeroDTO } from "./create-numero.dto";

export class UpdateNumeroDTO extends PartialType(CreateNumeroDTO) {

}