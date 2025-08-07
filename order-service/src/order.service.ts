import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(
      private readonly prismaService: PrismaService
  ) {
  }
  getOrders() {
    return this.prismaService.orders.findMany();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const data = await this.prismaService.orders.create({
      data: createOrderDto
    })

    return data;
  }
}
