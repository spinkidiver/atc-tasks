import { User } from "@/app/user/domain/entities/User";

export interface UserRepository {
  getProfile(): Promise<User>;
}
