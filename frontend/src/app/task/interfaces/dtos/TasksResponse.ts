import Task from "@/app/task/domain/entities/Task";

export default class TasksResponse {
  error: boolean;
  data: Task[];
  total: number;

  constructor({
    error = false,
    data = [],
    total = 0,
  }: {
    error: boolean;
    data: Task[];
    total: number;
  }) {
    this.error = error;
    this.data = data;
    this.total = total;
  }
}
