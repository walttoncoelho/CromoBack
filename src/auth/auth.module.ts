import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({ secret: process.env.APPLICATION_SECRET }),
    UserModule,
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {

}