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
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @IsPhoneNumber('BR', { message: 'O número de telefone fornecido não é válido.'})
  @IsOptional()
  telefone: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birth_date?: Date;
}