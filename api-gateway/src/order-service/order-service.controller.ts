import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {OrderService} from "./order-service.service";
import {CreateOrderServiceDto} from "./dto/create-order-service.dto";

@Controller('orders')
export class OrderServiceController {
    constructor(
        private readonly orderService: OrderService
    ) {
    }
    @Post()
    createOrder(@Body() payload) {
        return this.orderService.createOrder(payload);
    }
}
