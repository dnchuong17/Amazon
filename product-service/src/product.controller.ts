import {Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern("get_all_products")
  getAllProducts() {
    try {
      return this.productService.getAllProducts();
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern("get_product_by_id")
  getProduct(@Payload() data: any) {
    try {
      const { product_id } = data;
      return this.productService.getProduct(product_id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern("search_product")
  search(@Payload() payload) {
    try {
      const { name } = payload;
      return this.productService.searchProduct(name);
    } catch (error) {
      throw new Error(error)
    }
  }
}
