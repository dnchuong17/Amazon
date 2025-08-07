import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: "SHIPPING_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'shipping_queue'
        ,
        queueOptions: {
          durable: true //keep queue not be removed
        },
        persistent: true //help save the message when the api broke
      }
    }])],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ClientsModule, ShippingService]
})
export class ShippingModule {}
