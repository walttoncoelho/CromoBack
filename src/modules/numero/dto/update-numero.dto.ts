import { PartialType } from "@nestjs/mapped-types";
import { NumeroDTO } from "./numero.dto";

export class UpdateNumeroDTO extends PartialType(NumeroDTO) {

}