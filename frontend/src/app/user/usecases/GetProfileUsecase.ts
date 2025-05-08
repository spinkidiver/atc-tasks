import { UserRepository } from "@/app/user/interfaces/repositories/UserRepository";
import { User } from "@/app/user/domain/entities/User";

export class GetProfileUsecase {
  private userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }

  async execute(): Promise<User> {
    return await this.userRepository.getProfile();
  }
}
