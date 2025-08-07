import {Inject, Injectable} from '@nestjs/common';
import {catchError, lastValueFrom, of, retry, timeout} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class ProductServiceService {
  constructor(
      @Inject("PRODUCT_SERVICE") private readonly product_service: ClientProxy
  ) {
  }

  async getAllProducts() {
    const data = await lastValueFrom(this.product_service.send("get_all_products", {}).pipe(
        timeout(5000),
        retry(3),
        catchError(error => error)
    ));

    return data;
  }

  async getProduct(product_id: number) {
    const data = await lastValueFrom(this.product_service.send("get_product_by_id", {product_id}).pipe(
        timeout(5000),
        retry(3),
        catchError(error =>
        {
          console.log(error)
          return of({error: "product service error!"})
        })
    ))
    return data;
  }

  async searchProduct(name: string) {
    const data = await lastValueFrom(this.product_service.send("search_product", { name }).pipe(
        timeout(5000),
        retry(3),
        catchError(error =>
        {
          console.log(error)
          return of({error: "product service error!"})
        })
    ))
    return data;
  }
}
