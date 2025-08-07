import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
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
      }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [ClientsModule, UserService]
})
export class UserModule {}
