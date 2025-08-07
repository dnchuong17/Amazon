import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await
      NestFactory.createMicroservice<MicroserviceOptions>(PaymentModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'payment_queue'
          ,
          queueOptions: {
            durable: true
          },
          persistent: true
        }
      })
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap()
