import { User } from "@/app/user/domain/entities/User";
import { AuthRepository } from "../interfaces/repositories/AuthRepository";
import { RegisterRequest } from "@/app/auth/interfaces/dtos/RegisterRequest";

export default class RegisterUsecase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(data: RegisterRequest): Promise<User> {
    this.authRepo.setCsrf();
    return await this.authRepo.register(data);
  }
}
