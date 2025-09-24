// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // --- CONFIGURAÇÃO PARA SERVIR ARQUIVOS ESTÁTICOS ---
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // --- HABILITA A VALIDAÇÃO AUTOMÁTICA ---
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // --- HABILITA O CORS ---
  app.enableCors();

  // --- CONFIGURAÇÃO DO SWAGGER PARA DOCUMENTAÇÃO DA API ---
  const config = new DocumentBuilder()
    .setTitle('CRUD NestJS API')
    .setDescription(
      'Documentação da API do projeto de CRUD com NestJS e Prisma',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('1c6c7d5a-9b8e-4a2f-8d1c-0a9b8d7c6e5f', app, document, {
    customCssUrl:
      '/swagger-ui/swagger-ui.css',
    customJs: [
      '/swagger-ui/swagger-ui-bundle.js',
      '/swagger-ui/swagger-ui-standalone-preset.js',
    ],
    customfavIcon: '/swagger-ui/favicon-32x32.png'
  });

  // --- INICIA O SERVIDOR ---
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();