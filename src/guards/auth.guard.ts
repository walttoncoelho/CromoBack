import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard 
  implements CanActivate
{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context
      .switchToHttp()
      .getRequest();
    let { authorization } = request.headers;

    if (!authorization?.length)
      return false;

    let [ method, token ] = authorization.split(' ');

    try {
      let payload = this.authService.checkToken(token);
      request.tokenPayload = payload;
      request.user = await this.userService.show(payload.id);
      return true
    }
    catch (exception) {
      return false;
    }
  }
}