import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Injectable()
export class SubTasksService {
  constructor(private prisma: PrismaService) {}

  async create(createSubTaskDto: CreateSubTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id: createSubTaskDto.taskId },
    });

    if (!task) {
      throw new NotFoundException(
        `La tarea principal con ID ${createSubTaskDto.taskId} no existe.`,
      );
    }

    return this.prisma.subTask.create({
      data: createSubTaskDto,
    });
  }

  findAllByTask(taskId: string) {
    return this.prisma.subTask.findMany({
      where: { taskId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: string, updateSubTaskDto: UpdateSubTaskDto) {
    try {
      return await this.prisma.subTask.update({
        where: { id },
        data: updateSubTaskDto,
      });
    } catch {
      throw new NotFoundException(
        `No se pudo actualizar. La subtarea con ID ${id} no existe.`,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.subTask.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(
        `No se pudo eliminar. La subtarea con ID ${id} no existe.`,
      );
    }
  }
}
