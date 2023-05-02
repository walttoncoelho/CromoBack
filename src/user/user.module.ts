import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes({
      path: "users/:id",
      method: RequestMethod.ALL
    });
  }
}