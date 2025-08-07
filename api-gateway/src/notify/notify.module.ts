import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [ClientsModule.register([
    {
      name: "NOTIFY_SERVICE",
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
    }])],
  controllers: [NotifyController],
  providers: [NotifyService],
  exports: [ClientsModule, NotifyService]
})
export class NotifyModule {}
