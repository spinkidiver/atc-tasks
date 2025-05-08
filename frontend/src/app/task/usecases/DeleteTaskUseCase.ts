import { TaskRepository } from "@/app/task/usecases/repositories/TaskRepository";

export default class DeletetaskUseCase {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: number): Promise<void> {
    return await this.taskRepository.delete(id);
  }
}
