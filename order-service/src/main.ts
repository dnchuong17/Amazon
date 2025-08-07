import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await
      NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'order_queue'
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
