import { Module } from '@nestjs/common';
import { ProductServiceService } from './product_service.service';
import { ProductServiceController } from './product_service.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([{
    name: "PRODUCT_SERVICE",
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:1234@localhost:5672'],
      queue: 'product_queue'
      ,
      queueOptions: {
        durable: true
      },
      persistent: true
    }
  }])],
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
  exports: [ClientsModule]
})
export class ProductServiceModule {}
