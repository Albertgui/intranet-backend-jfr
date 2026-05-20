import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingsService {
  private readonly logger = new Logger(MeetingsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createMeetingDto: CreateMeetingDto, userId: string) {
    this.logger.log(
      `El usuario con ID ${userId} está creando una nueva acta: ${createMeetingDto.title}`,
    );

    return this.prisma.meeting.create({
      data: {
        title: createMeetingDto.title,
        date: createMeetingDto.date
          ? new Date(createMeetingDto.date)
          : undefined,
        location: createMeetingDto.location,
        description: createMeetingDto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.meeting.findMany({
      orderBy: { date: 'desc' },
      include: {
        tasks: true,
      },
    });
  }

  async findOne(id: string) {
    const meeting = await this.prisma.meeting.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            subtasks: true,
            assignedTo: { select: { name: true } },
          },
        },
        attendances: {
          include: {
            user: { select: { id: true, name: true, role: true, email: true } },
          },
        },
      },
    });

    if (!meeting) {
      throw new NotFoundException(`El acta o reunión con ID ${id} no existe.`);
    }

    return meeting;
  }

  async update(id: string, updateMeetingDto: UpdateMeetingDto) {
    try {
      return await this.prisma.meeting.update({
        where: { id },
        data: updateMeetingDto,
      });
    } catch {
      throw new NotFoundException(
        `No se pudo actualizar. La reunión con ID ${id} no existe.`,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.meeting.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(
        `No se pudo eliminar. La reunión con ID ${id} no existe.`,
      );
    }
  }

  async addAttendee(
    meetingId: string,
    data: { userId?: string; customName?: string },
  ) {
    if (!data.userId && !data.customName) {
      throw new BadRequestException(
        'Debe proporcionar un usuario registrado o un nombre personalizado.',
      );
    }

    try {
      return await this.prisma.attendance.create({
        data: {
          meetingId,
          userId: data.userId || null,
          customName: data.customName || null,
        },
        include: {
          user: { select: { id: true, name: true, role: true, email: true } },
        },
      });
    } catch (error) {
      this.logger.error('Error al agregar asistente:', error);
      throw new BadRequestException(
        'El asistente ya está registrado o los datos no son válidos.',
      );
    }
  }

  async removeAttendee(meetingId: string, attendanceId: string) {
    try {
      return await this.prisma.attendance.delete({
        where: { id: attendanceId, meetingId },
      });
    } catch {
      throw new NotFoundException(
        `No se pudo eliminar la asistencia. No existe el registro con ID ${attendanceId} en esta reunión.`,
      );
    }
  }
}
