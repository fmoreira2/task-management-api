import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	create(@Body() task: TaskDto) {
		this.taskService.create(task);
	}

    @Get('/:id')
    findOne(@Param('id') id: string): TaskDto {
        return this.taskService.findOne(id);
    }

    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() task: TaskDto) {
        this.taskService.update(id, task);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        this.taskService.delete(id);
    }
}
