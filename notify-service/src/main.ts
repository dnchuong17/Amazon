import { NestFactory } from '@nestjs/core';
import { NotifyModule } from './notify.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await
      NestFactory.createMicroservice<MicroserviceOptions>(NotifyModule, {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@localhost:5672'],
          queue: 'notify_queue'
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
