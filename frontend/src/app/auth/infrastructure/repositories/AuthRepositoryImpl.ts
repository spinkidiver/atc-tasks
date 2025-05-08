import { User } from "@/app/user/domain/entities/User";
import { AuthRepository } from "../../interfaces/repositories/AuthRepository";
import { RegisterRequest } from "@/app/auth/interfaces/dtos/RegisterRequest";
import { ApiService } from "@/app/global/services/ApiService";
import axios from "axios";

export class AuthRepositoryImpl implements AuthRepository {
  private readonly LOGIN_ENDPOINT = "//api/auth/login";
  private readonly REGISTER_ENDPOINT = "/api/auth/signup";

  async login(email: string, password: string): Promise<any> {
    try {
      const ApiClient = axios.create({
        baseURL: "http://localhost",
        withCredentials: true,
        withXSRFToken: true,
      });

      // Obtener CSRF
      await ApiClient.get("/sanctum/csrf-cookie", {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Intentar login
      const response = await ApiClient.post(
        "/api/auth/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data as User;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  }

  async register(userRequest: RegisterRequest): Promise<User> {
    try {
      const ApiClient = axios.create({
        baseURL: "http://localhost",
        withCredentials: true,
        withXSRFToken: true,
      });

      // Obtener CSRF
      await ApiClient.get("/sanctum/csrf-cookie", {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Intentar register
      const response = await ApiClient.post(
        this.REGISTER_ENDPOINT,
        { ...userRequest },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data as User;
    } catch (error: any) {
      const message = error.response?.data?.message || "Register failed";
      throw new Error(message);
    }
  }

  async logout(): Promise<void> {
    try {
      await ApiService.logout();
    } catch (error: any) {
      const message = error.response?.data?.message || "Register failed";
      throw new Error(message);
    }
  }

  async setCsrf(): Promise<void> {
    // Ya no se necesita porque ApiService lo hace internamente
    return;
  }
}
