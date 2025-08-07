import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import {MessagePattern} from "@nestjs/microservices";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('get_orders')
  getOrders() {
    try {
      return this.orderService.getOrders();
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('create_order')
  createOrder(createOrderDto: CreateOrderDto) {
    try {
      return this.orderService.createOrder(createOrderDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
