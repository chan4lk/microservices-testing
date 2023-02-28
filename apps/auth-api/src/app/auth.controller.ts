import { CreateUser } from '@microservices-testing/shared';
import { Controller, Logger} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(private readonly authService: AuthService) {}

  @EventPattern('create_user')
  createUser(@Payload() data: CreateUser) {
    this.logger.log('signup data received', typeof data);
    return this.authService.createUser(data.userName, data.password);
  }

  @MessagePattern('sign_in')
  async signIn(@Payload() data: CreateUser) {
    this.logger.log('signin data received',typeof data);
    return await this.authService.signIn(data.userName, data.password);
  }
}
