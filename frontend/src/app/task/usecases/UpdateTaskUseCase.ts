import { TaskRepository } from "@/app/task/usecases/repositories/TaskRepository";
import Task from "@/app/task/domain/entities/Task";
import TaskResponse from "@/app/task/interfaces/dtos/TaskResponse";

export default class UpdateTaskUseCase {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(task: Task): Promise<TaskResponse> {
    return await this.taskRepository.update(task);
  }
}
