import { AuthRepository } from "../interfaces/repositories/AuthRepository";

export default class LoginUsecase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(username: string, password: string): Promise<any> {
    this.authRepo.setCsrf();
    return await this.authRepo.login(username, password);
  }
}
