// file: LoginRequest.ts

export class LoginRequest {
  email: string;
  password: string;
  constructor(username = "", password = "") {
    this.email = username;
    this.password = password;
  }
}
