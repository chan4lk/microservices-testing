import { CreateUser } from '@microservices-testing/shared';
import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: 'create_user'})
  createUser(@Payload() data: CreateUser) {
    return this.authService.createUser(data.userName, data.password);
  }

  @MessagePattern({cmd: 'sign_in'})
  signIn(@Payload() data: CreateUser) {
    return this.authService.signIn(data.userName, data.password);
  }
}
