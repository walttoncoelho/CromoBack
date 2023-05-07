import { PartialType } from "@nestjs/mapped-types";
import { BannerDTO } from "./banner.dto";

export class UpdateBannerDTO extends PartialType(BannerDTO) {

}