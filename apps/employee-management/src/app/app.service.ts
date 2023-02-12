import { CreateUser, User } from '@microservices-testing/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  /**
   * The app service.
   */
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {
  }

  createUser(user: CreateUser) {
    return this.client.send<User>('create_user', JSON.stringify(user));
  }

  signIn(user: CreateUser) {
    return this.client.send<User>('sign_in', user);
  }

  getData(): { message: string } {
    return { message: 'Welcome to employee-management!' };
  }
}
