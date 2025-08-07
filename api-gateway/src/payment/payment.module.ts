import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: "PAYMENT_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'payment_queue'
        ,
        queueOptions: {
          durable: true //keep queue not be removed
        },
        persistent: true //help save the message when the api broke
      }
    },
  ])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [ClientsModule, PaymentService]
})
export class PaymentModule {}
