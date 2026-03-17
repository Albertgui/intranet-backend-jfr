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
    ] = await Promise.all([
      this.prisma.meeting.count(),

      this.prisma.subTask.count(),

      this.prisma.subTask.count({
        where: { isCompleted: true },
      }),

      this.prisma.subTask.count({
        where: { isCompleted: false },
      }),

      this.prisma.meeting.findMany({
        take: 5,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          date: true,
        },
      }),
    ]);

    return {
      totalMeetings,
      totalTasks,
      completedTasks,
      pendingTasks,
      recentMeetings,
    };
  }
}
