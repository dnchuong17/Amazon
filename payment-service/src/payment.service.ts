import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma/prisma.service";
import {PaymentDto} from "./dto/payment.dto";

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentPrisma: PrismaService
    ) {
    }

    async createPayment(paymentDto: PaymentDto) {
        paymentDto.payment_date = new Date();

        const data =  await this.paymentPrisma.payment.create({
            data: paymentDto
        })
        return data
    }
}
