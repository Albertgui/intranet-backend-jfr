import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id: createTaskDto.meetingId },
    });

    if (!meeting) {
      throw new NotFoundException(
        `La reunión con ID ${createTaskDto.meetingId} no existe.`,
      );
    }

    this.logger.log(`Usuario ${userId} creando tarea: ${createTaskDto.title}`);

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        priority: createTaskDto.priority,
        meetingId: createTaskDto.meetingId,
        createdById: userId,
        assignedToId: createTaskDto.assignedTo,
      },
    });
  }

  findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        meeting: {
          select: {
            title: true,
            date: true,
          },
        },
        createdBy: {
          select: { name: true, email: true },
        },
        assignedTo: {
          select: { name: true, email: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        meeting: true,
        createdBy: true,
        assignedTo: true,
        subtasks: true,
      },
    });

    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const { assignedTo, ...restData } = updateTaskDto;
      const dataToUpdate = {
        ...restData,
        ...(assignedTo !== undefined && { assignedToId: assignedTo }),
      };

      return await this.prisma.task.update({
        where: { id },
        data: dataToUpdate,
      });
    } catch {
      throw new NotFoundException(
        `No se pudo actualizar. La tarea con ID ${id} no existe.`,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.task.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(
        `No se pudo eliminar. La tarea con ID ${id} no existe.`,
      );
    }
  }
}
