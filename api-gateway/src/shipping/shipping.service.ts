import {Inject, Injectable} from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import {ClientProxy} from "@nestjs/microservices";
import {catchError, lastValueFrom, of, retry, timeout} from "rxjs";

@Injectable()
export class ShippingService {
    constructor(
        @Inject('SHIPPING_SERVICE') private readonly shipping_service: ClientProxy
    ) {
    }

    async createShipping(shippingDto: CreateShippingDto) {
        const data = await lastValueFrom(this.shipping_service.send('create_shipping', shippingDto).pipe(
            timeout(5000),
            retry(3),
            catchError(error =>
            {
                console.log(error)
                return of({error: "shipping service error!"})
            })
        ))

        return data;
    }
}
