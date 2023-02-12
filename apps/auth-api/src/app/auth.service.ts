import { User } from '@microservices-testing/shared';

class AuthService {
  private users: { userName: string; password: string; created: Date }[] = [];

  createUser(userName: string, password: string): Promise<User> {
    this.users.push({
      userName,
      password,
      created: new Date(),
    });

    const user = this.users
      .filter((x) => x.userName === userName)
      .map((x) => ({ userName: x.userName, created: x.created }))
      .find((x) => x.userName === userName);
    return Promise.resolve(user);
  }

  signIn(userName: string, password: string): Promise<User> {
    const user = this.users
      .filter((x) => x.userName === userName && x.password === password)
      .map((x) => ({ userName: x.userName, created: x.created }))
      .find((x) => x.userName === userName);
    return Promise.resolve(user);
  }
}

export { AuthService };
