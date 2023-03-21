import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({ secret: process.env.APPLICATION_SECRET })
  ]
})
export class AuthModule {

}