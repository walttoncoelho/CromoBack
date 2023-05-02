import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NumeroModule } from './numero/numero.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule, 
    AuthModule, 
    NumeroModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
