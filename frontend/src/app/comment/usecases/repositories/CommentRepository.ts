import Comment from "@/app/comment/domain/entities/Comment";
import {
  CommentResponse,
  CommentsResponse,
} from "@/app/comment/interfaces/dtos";

export interface CommentRepository {
  get(query: any): Promise<CommentsResponse>;
  store(groupComment: Comment): Promise<CommentResponse>;
  update(groupComment: Comment): Promise<CommentResponse>;
  delete(id: number): Promise<void>;
}
