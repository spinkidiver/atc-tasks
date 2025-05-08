import { User } from "@/app/user/domain/entities/User";
import { RegisterRequest } from "@/app/auth/interfaces/dtos/RegisterRequest";

export interface AuthRepository {
  login(username: string, password: string): Promise<User>;
  register(name: RegisterRequest): Promise<User>;
  logout(): Promise<void>;
  setCsrf(): Promise<void>;
}
