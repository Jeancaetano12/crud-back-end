// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- HABILITA A VALIDAÇÃO AUTOMÁTICA ---
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // --- CONFIGURAÇÃO DO SWAGGER PARA DOCUMENTAÇÃO DA API ---
  const config = new DocumentBuilder()
    .setTitle('CRUD NestJS API')
    .setDescription(
      'Documentação da API do projeto de CRUD com NestJS e Prisma',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // A linha abaixo define a rota onde a documentação estará disponível.
  // Neste caso: http://localhost:3000/api-docs
  SwaggerModule.setup('api-docs', app, document);

  // --- INICIA O SERVIDOR ---
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();