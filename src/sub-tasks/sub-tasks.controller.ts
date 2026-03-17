import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { SubTasksService } from './sub-tasks.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('sub-tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubTasksController {
  constructor(private readonly subTasksService: SubTasksService) {}

  @Post()
  @Roles('ADMIN', 'VOCERO')
  create(@Body() createSubTaskDto: CreateSubTaskDto) {
    return this.subTasksService.create(createSubTaskDto);
  }

  @Get('task/:taskId')
  findAllByTask(@Param('taskId', new ParseUUIDPipe()) taskId: string) {
    return this.subTasksService.findAllByTask(taskId);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
  ) {
    return this.subTasksService.update(id, updateSubTaskDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'VOCERO')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.subTasksService.remove(id);
  }
}
