import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data')
  getData() {
    return this.appService.getData();
  }

  @Post('/signup')
  createUser(@Body() user: {userName:string, password: string}){
    return this.appService.createUser(user);
  }

  @Post('/signIn')
  signIn(@Body() user: {userName:string, password: string}){
    return this.appService.signIn(user);
  }
}
