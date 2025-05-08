import Task from "@/app/task/domain/entities/Task";
import { TaskResponse, TasksResponse } from "@/app/task/interfaces/dtos";
import GetListRequest from "@/app/global/requests/dtos/GetListRequest";

export interface TaskRepository {
  get(query: GetListRequest): Promise<TasksResponse>;
  getById(id: number): Promise<TaskResponse>;
  store(task: Task): Promise<TaskResponse>;
  update(task: Task): Promise<TaskResponse>;
  delete(id: number): Promise<void>;
}
