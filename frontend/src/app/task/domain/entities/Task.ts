export type Status = "pending" | "completed" | "processing";

class Task {
  id?: number;
  name: string;
  description?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id = 0,
    name = "",
    description = "",
    status = "pending",
    createdAt = new Date(),
    updatedAt = new Date(),
  }: {
    id?: number;
    name?: string;
    description?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Task;
