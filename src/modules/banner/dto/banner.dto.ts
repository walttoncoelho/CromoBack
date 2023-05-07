import { IsString } from "class-validator";
import { CreateBannerDTO } from "./create-banner.dto";

export class BannerDTO extends CreateBannerDTO {
  @IsString()
  desktop: string;

  @IsString()
  mobile: string;
}