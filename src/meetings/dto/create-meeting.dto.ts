import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateMeetingDto {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título del acta/reunión es obligatorio' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description?: string;

  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (ISO 8601)' },
  )
  @IsOptional()
  date?: string | Date;

  @IsString({ message: 'La ubicación debe ser texto' })
  @IsOptional()
  location?: string;
}
