import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { BannerController } from "./banner.controller";
import { BannerService } from "./banner.service";
import { AuthModule } from "src/modules/auth/auth.module";
import { InfraestruturaModule } from "../infraestrutura/infraestrutura.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => InfraestruturaModule),
    forwardRef(() => AuthModule),
    FileModule,
  ],
  controllers: [BannerController],
  providers: [BannerService],
  exports: [BannerService]
})
export class BannerModule
  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      // {
      //   path: "/manager/banners/:id",
      //   method: RequestMethod.ALL
      // },
    );
  }
}