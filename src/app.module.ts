import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AuthModule } from './auth/auth.module';
import { SubTasksModule } from './sub-tasks/sub-tasks.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './user/user.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    TasksModule,
    MeetingsModule,
    AuthModule,
    SubTasksModule,
    DashboardModule,
    UsersModule,
  ],
})
export class AppModule {}
