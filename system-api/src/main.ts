import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  if (!port) throw new Error('Porta não configurada.');

  await app.listen(port);
}
bootstrap();
