import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { TaskStatus, Priority } from '@prisma/client';

export class CreateTaskDto {
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  @IsEnum(TaskStatus, {
    message:
      'El estado debe ser: PENDIENTE, EN_PROGRESO, COMPLETADA o BLOQUEADA',
  })
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(Priority, {
    message: 'La prioridad debe ser: BAJA, MEDIA, ALTA o URGENTE',
  })
  @IsOptional()
  priority?: Priority;

  @IsUUID('4', { message: 'El ID de la reunión debe ser un UUID válido' })
  @IsNotEmpty({ message: 'La tarea debe estar vinculada a una reunión' })
  meetingId: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsDateString({}, { message: 'La fecha límite debe ser una fecha válida' })
  @IsOptional()
  dueDate?: Date;
}
