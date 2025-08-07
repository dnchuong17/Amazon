import { NestFactory } from '@nestjs/core';
import { ShippingModule } from './shipping.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await
      NestFactory.createMicroservice<MicroserviceOptions>(ShippingModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'shipping_queue'
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
