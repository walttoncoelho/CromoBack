import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { NumeroController } from "./numero.controller";
import { NumeroService } from "./numero.service";

@Module({
  imports: [PrismaModule],
  controllers: [NumeroController],
  providers: [NumeroService],
  exports: [NumeroService]
})
export class NumeroModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes({
      path: "numeros/:id",
      method: RequestMethod.ALL
    });
  }
}