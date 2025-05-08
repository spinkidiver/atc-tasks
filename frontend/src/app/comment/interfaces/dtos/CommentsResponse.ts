import Comment from "@/app/comment/domain/entities/Comment";

export default class CommentsResponse {
  error: boolean;
  data: Comment[];
  total: number;

  constructor({
    error = false,
    data = [],
    total = 0,
  }: {
    error: boolean;
    data: Comment[];
    total: number;
  }) {
    this.error = error;
    this.data = data;
    this.total = total;
  }
}
