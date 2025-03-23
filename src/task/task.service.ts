import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
	private tasks: TaskDto[] = [];
	create(task: TaskDto) {
		this.tasks.push(task);
		console.log(this.tasks);
	}
	findOne(id: string): TaskDto {
		const task = this.tasks.find((task) => task.id === id);

		if (!task) {
			//throw new NotFoundException(`Task with ID ${id} not found`);
			throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
		}

		return task;
	}

	findAll(params: FindAllParameters): TaskDto[] {
		return this.tasks.filter(
			t => {
				let match = true;
				if (params.title != undefined  && !t.title.includes(params.title)) {
					match = false;
				}
				if (params.status != undefined && !t.status.includes(params.status)) {
					match = false;
				}
				return match;
			}
		);
	}

	update(id: string, task: TaskDto) {
		const taskIndex = this.tasks.findIndex((task) => task.id === id);

		if (taskIndex < 0) {
			throw new HttpException(`Task with ID ${id} not found`, HttpStatus.BAD_REQUEST);
		}

		this.tasks[taskIndex] = task;
	}

	delete(id: string) {
		const taskIndex = this.tasks.findIndex((task) => task.id === id);

		if (taskIndex < 0) {
			throw new HttpException(`Task with ID ${id} not found`, HttpStatus.BAD_REQUEST);
		}

		this.tasks.splice(taskIndex, 1);
	}
}
