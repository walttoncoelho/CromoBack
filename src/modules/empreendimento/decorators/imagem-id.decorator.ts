import { createParamDecorator, ExecutionContext } from "@nestjs/common";

function imagemIdCreator(_data: unknown, context: ExecutionContext) {
  return Number(context.switchToHttp().getRequest().params.imagem);
}

export const ImagemId = createParamDecorator(imagemIdCreator)