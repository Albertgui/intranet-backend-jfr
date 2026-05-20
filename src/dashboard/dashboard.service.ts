import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const [
      totalMeetings,
      totalTasks,
      completedTasks,
      pendingTasks,
      recentMeetings,
      // Recuentos por Estado (TaskStatus)
      tasksPendiente,
      tasksEnProgreso,
      tasksCompletada,
      tasksBloqueada,
      // Recuentos por Prioridad (Priority)
      tasksBaja,
      tasksMedia,
      tasksAlta,
      tasksUrgente,
    ] = await Promise.all([
      this.prisma.meeting.count(),
      this.prisma.subTask.count(),
      this.prisma.subTask.count({ where: { isCompleted: true } }),
      this.prisma.subTask.count({ where: { isCompleted: false } }),
      this.prisma.meeting.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          date: true,
        },
      }),
      // Estados
      this.prisma.task.count({ where: { status: 'PENDIENTE' } }),
      this.prisma.task.count({ where: { status: 'EN_PROGRESO' } }),
      this.prisma.task.count({ where: { status: 'COMPLETADA' } }),
      this.prisma.task.count({ where: { status: 'BLOQUEADA' } }),
      // Prioridades
      this.prisma.task.count({ where: { priority: 'BAJA' } }),
      this.prisma.task.count({ where: { priority: 'MEDIA' } }),
      this.prisma.task.count({ where: { priority: 'ALTA' } }),
      this.prisma.task.count({ where: { priority: 'URGENTE' } }),
    ]);

    return {
      totalMeetings,
      totalTasks,
      completedTasks,
      pendingTasks,
      recentMeetings,
      taskStatusCounts: {
        PENDIENTE: tasksPendiente,
        EN_PROGRESO: tasksEnProgreso,
        COMPLETADA: tasksCompletada,
        BLOQUEADA: tasksBloqueada,
      },
      taskPriorityCounts: {
        BAJA: tasksBaja,
        MEDIA: tasksMedia,
        ALTA: tasksAlta,
        URGENTE: tasksUrgente,
      },
    };
  }
}
