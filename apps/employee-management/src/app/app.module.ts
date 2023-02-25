import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

export const host = process.env.API_HOST || '0.0.0.0';
export const port = parseInt(process.env.API_PORT) || 3334;

@Module({
  imports: [
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.TCP, options : { host, port}}
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
