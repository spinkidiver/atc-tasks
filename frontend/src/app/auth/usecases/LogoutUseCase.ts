import { AuthRepository } from "../interfaces/repositories/AuthRepository";

export default class LogoutUsecase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(): Promise<void> {
    console.log("usecase");

    await this.authRepo.logout();
  }
}
