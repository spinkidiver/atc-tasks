// file: RegisterRequest.ts

export class RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  constructor(username = "", password = "", name = "", email = "") {
    this.email = email;
    this.password = password;
    this.name = name;
    this.username = username;
  }
}
