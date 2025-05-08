import { CommentRepository } from "@/app/comment/usecases/repositories/CommentRepository";
import {
  CommentsResponse,
  CommentResponse,
} from "@/app/comment/interfaces/dtos";
import GetListRequest from "@/app/global/requests/dtos/GetListRequest";
import Comment from "@/app/comment/domain/entities/Comment";
import { ApiService } from "@/app/global/services/ApiService";
import axios from "axios";

export class CommentRepositoryImpl implements CommentRepository {
  private readonly ENDPOINT = "/api/comments";

  constructor() {}

  async get(query: GetListRequest): Promise<CommentsResponse> {
    return await ApiService.get<CommentsResponse>(this.ENDPOINT, query);
  }

  async store(comment: Comment): Promise<CommentResponse> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.post(this.ENDPOINT, comment);
    return response.data as CommentResponse;
  }

  async update(comment: Comment): Promise<CommentResponse> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.put(`${this.ENDPOINT}/${comment.id}`, comment);
    return response.data as CommentResponse;
  }

  async delete(id: number): Promise<void> {
    await axios.get("/sanctum/csrf-cookie");

    const response = await axios.delete(`/api/comments/${id}`);
    return;
  }
}
