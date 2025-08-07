import {Inject, Injectable} from '@nestjs/common';
import { CreateOrderServiceDto } from './dto/create-order-service.dto';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, lastValueFrom, of, retry, timeout} from "rxjs";
import {NotifyService} from "../notify/notify.service";
import {UserService} from "../user/user.service";
import {PaymentService} from "../payment/payment.service";
import {ShippingService} from "../shipping/shipping.service";

@Injectable()
export class OrderService {
  constructor(
      @Inject('ORDER_SERVICE') private readonly order_service: ClientProxy,
      private readonly notify_service: NotifyService,
      private readonly user_service: UserService,
      private readonly payment_service: PaymentService,
      private readonly shipping_service: ShippingService
  ) {
  }
  async getOrders() {
    const data = await lastValueFrom(this.order_service.send('get_all_orders', {}))

    return data;
  }

  async createOrder(createOrder: CreateOrderServiceDto ) {

    const userExisted  = await this.user_service.findUserByID( createOrder.user_id )

    if (userExisted) {
      await this.notify_service.sendConfirmMail(userExisted.email)


      const newOrder = await lastValueFrom(this.order_service.send('create_order', {
        product_id: createOrder.product_id,
        user_id: createOrder.user_id
      }).pipe(
          timeout(5000),
          retry(3),
          catchError(error =>
          {
            console.log(error)
            return of({error: "order service error!"})
          })
      ))

      const { method,
        status,
        amount,
        payment_date } = createOrder;

      const paymentData = await this.payment_service.createPayment({
        order_id: newOrder.order_id,
        method,
        status,
        amount,
        payment_date
      })

      const { street, city, gender } = createOrder;

      const newShipping = await this.shipping_service.createShipping({
        product_id: newOrder.product_id,
        order_id: newOrder.order_id,
        first_name: userExisted.first_name,
        last_name: userExisted.last_name,
        phone: userExisted.phone,
        email: userExisted.email,
        street,
        city,
        gender
      })

      await this.notify_service.sendSuccessMail(userExisted.email)
      return {
        status: 201,
        message: "Successfully",
        data: {
          order: newOrder,
          payment: paymentData,
          shipping: newShipping
        }
      };
    }

    return "Something when wrong!"

  }
}
