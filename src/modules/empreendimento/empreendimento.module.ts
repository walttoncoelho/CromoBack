import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { IdCheckMiddleware } from "src/middlewares/id-check.middleware";
import { PrismaModule } from "src/prisma/prisma.module";
import { EmpreendimentoController } from "./empreendimento.controller";
import { EmpreendimentoService } from "./empreendimento.service";
import { AuthModule } from "src/modules/auth/auth.module";
import { InfraestruturaModule } from "../infraestrutura/infraestrutura.module";
import { FileModule } from "../file/file.module";
import { FotoEmpreendimentoModule } from "../foto-empreendimento/foto-empreendimento.module";

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => UserModule),
    forwardRef(() => InfraestruturaModule),
    forwardRef(() => AuthModule),
    FileModule,
    FotoEmpreendimentoModule
  ],
  controllers: [EmpreendimentoController],
  providers: [EmpreendimentoService],
  exports: [EmpreendimentoService]
})
export class EmpreendimentoModule
  implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdCheckMiddleware).forRoutes(
      {
        path: "/manager/empreendimentos/:id",
        method: RequestMethod.ALL
      },
      {
        path: "/manager/empreendimentos/:id/toggle-status",
        method: RequestMethod.ALL
      },
    );
  }
}