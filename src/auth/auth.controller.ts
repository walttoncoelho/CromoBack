import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";

@Controller("auth")
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  
  @Post("login")
  async login(
    @Body() { email, password }: AuthLoginDTO
  ) {
    return await this.authService.login(email, password);
  }

  @Post("register")
  async register(
    @Body() body: AuthRegisterDTO
  ) {
    return await this.authService.register(body);
  }

  @Post("forget")
  async forget(
    @Body() { email }: AuthForgetDTO
  ) {
    return await this.authService.forget(email)
  }

  @Post("reset")
  async reset(
    @Body() { password, token }: AuthResetDTO
  ) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  async me(
    @Request() request
  ) {
    return {
      me: "ok",
      data: request.tokenPayload
    };
  }
}