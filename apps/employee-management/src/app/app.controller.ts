import { CreateUser } from '@microservices-testing/shared';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data')
  getData() {
    return this.appService.getData();
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() user: CreateUser){
    return this.appService.createUser(user);
  }

  @Post('/signIn')
  signIn(@Body() user: CreateUser){
    return this.appService.signIn(user);
  }
}
