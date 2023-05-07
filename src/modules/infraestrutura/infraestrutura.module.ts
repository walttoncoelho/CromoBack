import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { InfraestruturaController } from "./infraestrutura.controller";
import { InfraestruturaService } from "./infraestrutura.service";
import { AuthModule } from "src/modules/auth/auth.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    FileModule
  ],
  controllers: [InfraestruturaController],
  providers: [InfraestruturaService],
  exports: [InfraestruturaService]
})
export class InfraestruturaModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      {
        path: "/manager/infraestruturas/:id",
        method: RequestMethod.ALL
      }
    );
  }
}