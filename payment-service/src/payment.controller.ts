import { Controller } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('create_payment')
  createPayment(@Payload() data) {
    try {
      return this.paymentService.createPayment(data)
    } catch (error) {
      throw new Error(error)
    }
  }
}
