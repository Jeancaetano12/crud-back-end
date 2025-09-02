import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Método create --- 
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });
    if (userExists) {
      throw new ConflictException('Este e-mail já está em uso');
    }

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return user;
  }

  // --- Metodo find all ---
  findAll() {
    return this.prisma.user.findMany();
  }

  // --- Metodo find one ---
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
  

    if (!user) {
      throw new NotFoundException(`Usuário com o ID '${id}' não encontrado.`);
    }

    return user;
  }
  
  // --- Metodo update ---
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  // --- Metodo remove ---
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id }
    });
  }
}
