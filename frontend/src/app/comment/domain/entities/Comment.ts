class Comment {
  id?: number;
  task_id?: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id = 0,
    task_id = 0,
    content = "",
    createdAt = new Date(),
    updatedAt = new Date(),
  }: {
    id?: number;
    task_id?: number;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id;
    this.task_id = task_id;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Comment;
