/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3334;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: 0, // TCP
      options: {
        port
      }
    },
  );
  await app.listen();
 

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
