import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase/firebase_admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGEBUCKETFILES,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  const configDocs = new DocumentBuilder()
    .setTitle('Gestion tutorias')
    .setDescription('Documentacion api gestion de tutorias')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(8001);
}
bootstrap();
