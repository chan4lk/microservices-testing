import { CreateUser } from '@microservices-testing/shared';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
    this.appService.createUser(user);
  }

  @Post('/signIn')
  @HttpCode(200)
  @ApiOperation({ summary: 'login with user' })
  signIn(@Body() user: CreateUser){
    return this.appService.signIn(user);
  }
}
