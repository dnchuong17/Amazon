export class CreateOrderServiceDto {
    product_id: number;
    user_id: number;
    order_id: number;
    method: string;
    status: string;
    amount: number;
    payment_date: Date;
    street: string;
    city: string;
    gender: string;
}
