import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";
import {CreateShippingDto} from "./dto/create-shipping.dto";

@Injectable()
export class ShippingService {
  constructor(
      private readonly prismaService: PrismaService,
  ) {
  }
  async createShipping(shippingDto: CreateShippingDto) {
    const shippingData =await this.prismaService.shipping.create({
      data: shippingDto
    })

    console.log(shippingData);
    return shippingData;
  }
}
