import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateEventPaymentDto, EventPaymentDto } from 'shared/models';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('/')
    async assignPayment(@Body() dto: CreateEventPaymentDto) {
        const res = await this.paymentService.assignPayment(dto);
        return res;
    }

    @Get('/')
    async getEventsPayment(@Headers() headers: any): Promise<EventPaymentDto[]> {
        return this.paymentService.getEventsPayment(headers);
    }

    @Post('/pay')
    async payTransaction() {
        return this.paymentService.pay();
    }
}
