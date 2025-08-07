import {Inject, Injectable} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, lastValueFrom, of, retry, timeout} from "rxjs";

@Injectable()
export class PaymentService {
  constructor(
      @Inject('PAYMENT_SERVICE') private readonly payment_service: ClientProxy
  ) {
  }

  async createPayment(paymentDto: CreatePaymentDto) {
    const data = await lastValueFrom(this.payment_service.send('create_payment', paymentDto).pipe(
        timeout(5000),
        retry(3),
        catchError(error =>
        {
          console.log(error)
          return of({error: "payment service error!"})
        })
    ))
    return data;
  }
}
