import { createParamDecorator, ExecutionContext } from "@nestjs/common";

function paramIdCreator(_data: unknown, context: ExecutionContext) {
  return Number(context.switchToHttp().getRequest().params.id);
}

export const ParamId = createParamDecorator(paramIdCreator)