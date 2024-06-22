import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    controllers: [PaymentController],
    providers: [PaymentService, DatabaseService, JwtService],
    exports: [PaymentService]
})
export class PaymentModule {}
