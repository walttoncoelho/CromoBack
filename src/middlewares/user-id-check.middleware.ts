import { NestMiddleware, BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class UserIdCheckMiddleware 
  implements NestMiddleware
{
  use(req: Request, res: Response, next: NextFunction) {
    let id = Number(req.params.id);
    if (isNaN(id) || id <= 0)
      throw new BadRequestException("ID inválido");
    next();
  }
}