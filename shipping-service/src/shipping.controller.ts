import { Controller, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateShippingDto} from "./dto/create-shipping.dto";

@Controller()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @MessagePattern('create_shipping')
  createShipping(@Payload() data: CreateShippingDto) {
    try {
      return this.shippingService.createShipping(data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
