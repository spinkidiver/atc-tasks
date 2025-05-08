import { TaskRepository } from "@/app/task/usecases/repositories/TaskRepository";
import { TaskResponse } from "../interfaces/dtos";

export default class GetTaskByIdUseCase {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: number): Promise<TaskResponse> {
    return await this.taskRepository.getById(id);
  }
}
