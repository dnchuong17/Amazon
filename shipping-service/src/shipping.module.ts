import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import {PrismaModule} from "./prisma/prisma.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
      }
  )],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
