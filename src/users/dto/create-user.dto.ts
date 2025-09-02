import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Matches, // Usaremos o Matches para a validação mais precisa
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'A data de nascimento deve estar no formato YYYY-MM-DD.',
  })
  @Type(() => Date) // Essencial para converter a string em um objeto Date para o Prisma
  birth_date?: Date;
}