// Implementation of UserRepository

import { User } from "@/app/user/domain/entities/User";
import { UserRepository } from "@/app/user/interfaces/repositories/UserRepository";

export class UserRepositoryImpl implements UserRepository {
  constructor() {}

  async getProfile(): Promise<User> {
    // try {
    const response = await fetch("/api/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`getProfile  failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.data as User;
    // } catch (error) {
    //   throw error;
    // }
  }
}
