import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
       // Opcional:  Garante que a conexão com o banco foi bem sucedida ao iniciar o app
       await this.$connect();
    }
}
