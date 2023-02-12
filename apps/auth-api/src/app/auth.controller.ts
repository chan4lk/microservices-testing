import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: 'create_user'})
  createUser(user: string, password: string) {
    return this.authService.createUser(user, password);
  }

  @MessagePattern({cmd: 'sign_in'})
  signIn(user: string, password: string) {
    return this.authService.signIn(user, password);
  }
}
