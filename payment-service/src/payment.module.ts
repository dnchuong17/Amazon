import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import {PrismaService} from "./prisma/prisma.service";
import {ConfigModule} from "@nestjs/config";
import {PrismaModule} from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
})
export class PaymentModule {}
