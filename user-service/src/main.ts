import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await
      NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'user_queue'
          ,
          queueOptions: {
            durable: true
          },
          persistent: true
        }
      })
  await app.listen();
}
bootstrap()

