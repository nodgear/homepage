import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  console.log(join(process.cwd(), '/src/actions/files'));

  app.useStaticAssets(join(process.cwd(), '/src/actions/files'), {
    prefix: '/assets/',
  });

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  if (!port) throw new Error('Porta não configurada.');

  await app.listen(port);
}
bootstrap();
