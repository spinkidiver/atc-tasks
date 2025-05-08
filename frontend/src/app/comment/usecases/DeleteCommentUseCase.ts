import { CommentRepository } from "@/app/comment/usecases/repositories/CommentRepository";

export default class DeletecommentUseCase {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(id: number): Promise<void> {
    return await this.commentRepository.delete(id);
  }
}
