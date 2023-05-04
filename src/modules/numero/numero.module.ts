import { forwardRef, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { NumeroController } from "./numero.controller";
import { NumeroService } from "./numero.service";
import { AuthModule } from "src/modules/auth/auth.module";

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
  configure(consumer: MiddlewareConsumer) { }
}