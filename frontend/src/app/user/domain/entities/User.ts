export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public name: string,
    public lastname: string,
    public createdAt: Date = new Date()
  ) {}

  static create(
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string
  ): User {
    return new User(id, username, email, firstName, lastName);
  }
}
