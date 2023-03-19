import { IsBoolean } from "class-validator";

export class ToggleUserStatusDTO {
  @IsBoolean()
  status: boolean;
}