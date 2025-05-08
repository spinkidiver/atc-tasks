import { CommentRepository } from "@/app/comment/usecases/repositories/CommentRepository";
import Comment from "@/app/comment/domain/entities/Comment";
import CommentResponse from "@/app/comment/interfaces/dtos/CommentResponse";

export default class UpdateCommentUseCase {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(comment: Comment): Promise<CommentResponse> {
    return await this.commentRepository.update(comment);
  }
}
