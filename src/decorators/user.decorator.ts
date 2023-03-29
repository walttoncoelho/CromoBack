import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

function userCreator(filter: string, context: ExecutionContext) {
  let request = context.switchToHttp().getRequest();
  let user = request.user;
  
  if (user) {
    if (filter) {
      return user[filter];
    }
    return user;
  }
  else throw new NotFoundException([
    "Usuário não encontrado no Request.",
    "Use o AuthGuard para obter o usuário"
  ].join(" "));
}

export const User = createParamDecorator(userCreator)