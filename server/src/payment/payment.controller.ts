import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateEventPaymentDto } from 'shared/models';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post('/')
    async createEventPayment(@Body() dto: CreateEventPaymentDto) {}

    @Get('/')
    async getEventsPayment(@Headers() headers: any) {
        return [];
    }
}
