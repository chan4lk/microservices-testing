import { User } from '@microservices-testing/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
class AuthService {
  private users: { userName: string; password: string; created: Date }[] = [];

  createUser(userName: string, password: string): Promise<User> {

    if(this.users.length >= 100) {
      this.users = [];
      throw new Error('User limit reached');
    }

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
    console.log(this.users);
    const user = this.users
      .filter((x) => x.userName === userName && x.password === password)
      .map((x) => ({ userName: x.userName, created: x.created }))
      .find((x) => x.userName === userName);
    return Promise.resolve(user);
  }
}

export { AuthService };
