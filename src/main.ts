import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [ "http://localhost:3001", /* domínio da aplicação Front do CROMO */ ]
  });
  app.useGlobalPipes(new ValidationPipe);
  app.useGlobalInterceptors(new LogInterceptor)
  await app.listen(3000);
  applicationUrl = process.env.APPLICATION_URL ?? await app.getUrl();
}
bootstrap();

export let applicationUrl: string;