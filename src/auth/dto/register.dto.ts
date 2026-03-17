import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsOptional()
  @IsIn(['ADMIN', 'VOCERO', 'HABITANTE'], {
    message: 'Rol inválido. Debe ser ADMIN, VOCERO o HABITANTE',
  })
  role?: 'ADMIN' | 'VOCERO' | 'HABITANTE';
}
