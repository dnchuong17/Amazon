import {Transform} from "class-transformer";

export class CreatePaymentDto {
    order_id: number;
    method: string;

    @Transform(({ value }) => value ?? "unpaid")
    status: string;
    amount: number;
    payment_date: Date;
}