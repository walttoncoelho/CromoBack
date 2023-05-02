import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { FaleConoscoController } from "./fale-conosco.controller";
import { FaleConoscoService } from "./fale-conosco.service";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [FaleConoscoController],
  providers: [FaleConoscoService],
  exports: [FaleConoscoService]
})
export class FaleConoscoModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes({
      path: "/manager/leads/:id",
      method: RequestMethod.ALL
    });
  }
}