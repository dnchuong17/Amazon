import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { ProductServiceModule } from './product_service/product_service.module';
import { OrderServiceModule } from './order-service/order-service.module';
import { NotifyModule } from './notify/notify.module';
import { ShippingModule } from './shipping/shipping.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ProductServiceModule, OrderServiceModule, NotifyModule, ShippingModule, UserModule, PaymentModule],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
