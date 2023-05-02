import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { NumeroController } from "./numero.controller";
import { NumeroService } from "./numero.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [NumeroController],
  providers: [NumeroService],
  exports: [NumeroService]
})
export class NumeroModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      {
        path: "/manager/numeros/:id",
        method: RequestMethod.ALL
      },
      {
        path: "/manager/numeros/:id/toggle-status",
        method: RequestMethod.ALL
      },
    );
  }
}