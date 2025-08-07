import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { ProductServiceService } from './product_service.service';

@Controller('products')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}
  @Get()
  getProducts() {
    return this.productServiceService.getAllProducts();
  }

  @Get('/search_product')
  searchProduct(@Query('name') payload: string) {
    return this.productServiceService.searchProduct(payload)
  }

  @Get('/:id')
  getProduct(@Param('id') payload:number) {
    return this.productServiceService.getProduct(payload)
  }
}
