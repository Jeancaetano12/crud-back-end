import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsOptional
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome completo do usuário.',
    example: 'Jean Caetano',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({
    description: 'O endereço de e-mail único do usuário.',
    example: 'jean.teste@email.com',
  })
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @ApiPropertyOptional({
    description: 'O número de telefone do usuário (opcional), incluindo DDD.',
    example: '85999999999',
  })
  @IsPhoneNumber('BR', { message: 'O número de telefone fornecido não é válido.'})
  @IsOptional()
  telefone: string;

  @ApiPropertyOptional({
    description: 'A data de nascimento do usuário (opcional), no formato YYYY-MM-DD.',
    example: '2004-01-17',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birth_date?: Date;
}