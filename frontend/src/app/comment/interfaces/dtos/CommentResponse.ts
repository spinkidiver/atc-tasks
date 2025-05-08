import Comment from "@/app/comment/domain/entities/Comment";

export default class CommentResponse {
  error: boolean;
  data: Comment;

  constructor({
    error = false,
    data = new Comment({}),
  }: {
    error: boolean;
    data: Comment;
    total: number;
  }) {
    this.error = error;
    this.data = data;
  }
}
