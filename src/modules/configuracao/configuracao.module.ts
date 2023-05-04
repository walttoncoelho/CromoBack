import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { ConfiguracaoController } from "./configuracao.controller";
import { ConfiguracaoService } from "./configuracao.service";
import { AuthModule } from "src/modules/auth/auth.module";

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [ConfiguracaoController],
  providers: [ConfiguracaoService],
  exports: [ConfiguracaoService]
})
export class ConfiguracaoModule
  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      {
        path: "/manager/configuracoes/:id",
        method: RequestMethod.ALL
      },
    );
  }
}