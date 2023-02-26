import { CreateUser } from '@microservices-testing/shared';
import { Controller} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('create_user')
  createUser(@Payload() data: CreateUser) {
    console.log('signup data received', typeof data);
    return this.authService.createUser(data.userName, data.password);
  }

  @MessagePattern('sign_in')
  async signIn(@Payload() data: CreateUser) {
    console.log('signin data received',typeof data);
    return await this.authService.signIn(data.userName, data.password);
  }
}
