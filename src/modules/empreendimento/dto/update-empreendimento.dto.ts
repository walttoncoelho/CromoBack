import { PartialType } from "@nestjs/mapped-types";
import { CreateEmpreendimentoDTO } from "./create-empreendimento.dto";

export class UpdateEmpreendimentoDTO extends PartialType(CreateEmpreendimentoDTO) {

}