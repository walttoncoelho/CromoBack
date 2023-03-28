import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard 
  implements CanActivate
{
  constructor(
    private readonly authService: AuthService
  ) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let request = context
      .switchToHttp()
      .getRequest();
    let { authorization } = request.headers;

    if (!authorization.length)
      return false;

    let [ method, token ] = authorization.split(' ');

    try {
      let payload = this.authService.checkToken(token);
      request.tokenPayload = payload;
      return true
    }
    catch (exception) {
      return false;
    }
  }
}