import Task from "@/app/task/domain/entities/Task";

export default class TaskResponse {
  error: boolean;
  data: Task;

  constructor({
    error = false,
    data = new Task({}),
  }: {
    error: boolean;
    data: Task;
    total: number;
  }) {
    this.error = error;
    this.data = data;
  }
}
