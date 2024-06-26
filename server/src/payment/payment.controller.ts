import { Body, Controller, Get, Headers, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfirmTransactionDto, CreateEventPaymentDto, CreateIntentDto, EventPaymentDto, EventStudentDto } from 'shared/models';

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
    async payTransaction(@Body() dto: CreateIntentDto) {
        return this.paymentService.pay(dto);
    }

    @Post('/confirm')
    async confirmTransaction(@Body() dto: ConfirmTransactionDto) {
        return await this.paymentService.confirmTransaction(dto);
    }

    @Get('/:id')
    async getStudentEvents(@Headers() headers: any, @Param('id', ParseIntPipe) studentId: number): Promise<EventStudentDto[]> {
        return await this.paymentService.getStudentEvents(headers, studentId);
    }
}
