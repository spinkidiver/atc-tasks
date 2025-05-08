import { CommentRepository } from "@/app/comment/usecases/repositories/CommentRepository";
import GetListRequest from "@/app/global/requests/dtos/GetListRequest";
import CommentsResponse from "@/app/comment/interfaces/dtos/CommentsResponse";

export default class ListCommentUseCase {
  private commentRepository: CommentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async execute(query: GetListRequest): Promise<CommentsResponse> {
    return await this.commentRepository.get(query);
  }
}
