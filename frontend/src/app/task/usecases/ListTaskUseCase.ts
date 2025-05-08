import { TaskRepository } from "@/app/task/usecases/repositories/TaskRepository";
import GetListRequest from "@/app/global/requests/dtos/GetListRequest";
import TasksResponse from "@/app/task/interfaces/dtos/TasksResponse";

export default class ListTaskUseCase {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(query: GetListRequest): Promise<TasksResponse> {
    return await this.taskRepository.get(query);
  }
}
