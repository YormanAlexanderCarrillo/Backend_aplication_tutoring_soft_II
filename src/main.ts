import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const configDocs = new DocumentBuilder()
    .setTitle('Gestion tutorias')
    .setDescription('Documentacion api gestion de tutorias')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(8000);
}
bootstrap();
