import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {PrismaModule} from "./prisma/prisma.module";
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
