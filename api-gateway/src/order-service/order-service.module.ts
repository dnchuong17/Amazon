import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {OrderService} from "./order-service.service";
import {NotifyModule} from "../notify/notify.module";
import {UserModule} from "../user/user.module";
import {PaymentModule} from "../payment/payment.module";
import {ShippingModule} from "../shipping/shipping.module";

@Module({
  imports: [ClientsModule.register([
    {
      name: "ORDER_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'order_queue'
        ,
        queueOptions: {
          durable: true //keep queue not be removed
        },
        persistent: true //help save the message when the api broke
      }
    },
  ]), NotifyModule, UserModule, PaymentModule, ShippingModule],
  controllers: [OrderServiceController],
  providers: [OrderService],
  exports: [ClientsModule]
})
export class OrderServiceModule {}
