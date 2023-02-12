import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  /**
   *
   */
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {
  }

  createUser(user: { userName: string; password: string; }) {
    return this.client.send<{ userName: string; created: Date; }>('create_user', user);
  }

  signIn(user: { userName: string; password: string; }) {
    return this.client.send<{ userName: string; created: Date; }>('sign_in', user);
  }

  getData(): { message: string } {
    return { message: 'Welcome to employee-management!' };
  }
}
