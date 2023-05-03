import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EmpreendimentoModule } from './modules/empreendimento/empreendimento.module';
import { FaleConoscoModule } from './modules/fale-conosco/fale-conosco.module';
import { NumeroModule } from './modules/numero/numero.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule), 
    forwardRef(() => NumeroModule),
    forwardRef(() => FaleConoscoModule),
    forwardRef(() => EmpreendimentoModule),
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
