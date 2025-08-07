import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(
      private readonly prismaService: PrismaService
  ) {
  }
  getAllProducts() {
    return this.prismaService.products.findMany();
  }

  getProduct(product_id: number) {
    product_id = Number(product_id)

    return this.prismaService.products.findFirst({
      where: {
        product_id: product_id
      }
    });
  }

  searchProduct(name: string) {
    return this.prismaService.products.findMany(
        {
          where: {
            name: {
              contains: name
            }
          }
        }
    )
  }

}
