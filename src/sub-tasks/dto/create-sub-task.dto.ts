import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateSubTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título de la subtarea es obligatorio' })
  title: string;

  @IsUUID('all', {
    message: 'El ID de la tarea principal debe ser un UUID válido',
  })
  @IsNotEmpty({ message: 'El ID de la tarea principal es obligatorio' })
  taskId: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
