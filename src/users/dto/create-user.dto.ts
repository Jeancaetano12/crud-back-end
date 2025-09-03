import { Type } from 'class-transformer';
import {
  IsDate,
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
  @Type(() => Date)
  @IsDate()
  birth_date?: Date;
}