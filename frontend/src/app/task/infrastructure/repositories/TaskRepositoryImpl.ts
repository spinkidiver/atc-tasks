import { TaskRepository } from "@/app/task/usecases/repositories/TaskRepository";
import { TasksResponse, TaskResponse } from "@/app/task/interfaces/dtos";
import GetListRequest from "@/app/global/requests/dtos/GetListRequest";
import Task from "@/app/task/domain/entities/Task";
import { ApiService } from "@/app/global/services/ApiService";
import axios from "axios";

export class TaskRepositoryImpl implements TaskRepository {
  private readonly ENDPOINT = "/api/tasks";

  constructor() {}

  async get(query: GetListRequest): Promise<TasksResponse> {
    return await ApiService.get<TasksResponse>(this.ENDPOINT, query);
  }

  async getById(id: number): Promise<TaskResponse> {
    return await ApiService.get<TaskResponse>(`${this.ENDPOINT}/${id}`);
  }

  async store(task: Task): Promise<TaskResponse> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.post(this.ENDPOINT, task);
    return response.data as TaskResponse;
  }

  async update(task: Task): Promise<TaskResponse> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.put(`${this.ENDPOINT}/${task.id}`, task);
    return response.data as TaskResponse;
  }

  async delete(id: number): Promise<void> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.delete(`/api/tasks/${id}`);
    return;
  }
}
