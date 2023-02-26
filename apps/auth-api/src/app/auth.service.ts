import { User } from '@microservices-testing/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
class AuthService {
  private users: { userName: string; password: string; created: Date }[] = [];
  private delay_create = 100;
  private delay = 100;

  constructor() {
    this.delay_create = this.delay = parseInt(process.env.API_DELAY) || 100;
  }

  async createUser(userName: string, password: string): Promise<User> {

    if(this.users.length >= 100) {
      this.users = [];
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

  async signIn(userName: string, password: string): Promise<User> {
    console.log(this.users);
    
    this.delay_create += 100;

    if(this.delay_create >= 2500){
      this.delay_create = this.delay;
      throw new Error('Maximum delay reached.')
    }

    await new Promise(r => setTimeout(r, this.delay_create)); 

    const user = this.users
      .filter((x) => x.userName === userName && x.password === password)
      .map((x) => ({ userName: x.userName, created: x.created }))
      .find((x) => x.userName === userName);
    return Promise.resolve(user);
  }
}

export { AuthService };
