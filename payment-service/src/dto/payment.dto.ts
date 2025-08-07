import {Transform} from "class-transformer";

export class PaymentDto {
    order_id: number;
    method: string;

    @Transform(({ value }) => value ?? "unpaid")
    status: string;
    amount: number;
    payment_date: Date;
}