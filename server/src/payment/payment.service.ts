import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventPayment, Prisma, Transaction, TransactionStatus, TransactionType } from '@prisma/client';
import { CreateEventPaymentDto } from 'shared/models';
import { DateTimeService } from 'shared/services';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async getEventsPayment(headers: any) {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const data = await this.prisma.transaction.findMany({
            where: {
                student: {
                    centerName: {
                        equals: decoded.centerName
                    }
                }
            }
        });
    }

    async assignPayment(createPaymentDto: CreateEventPaymentDto) {
        const shouldInitTransaction = createPaymentDto.price && createPaymentDto.price !== createPaymentDto.amountPaid;
        const transaction = shouldInitTransaction
            ? ({
                  amount: new Prisma.Decimal(createPaymentDto.price - (createPaymentDto.amountPaid ?? 0)),
                  description: createPaymentDto.note,
                  currencyCode: 'BYR',
                  status: TransactionStatus.pending,
                  timestamp: new Date(),
                  type: TransactionType.charge,
                  studentId: createPaymentDto.studentId,
                  teacherId: createPaymentDto.teacherId
              } as Transaction)
            : undefined;

        const persistedTransaction = transaction ? await this.prisma.transaction.create({ data: transaction }) : undefined;

        const eventPayment = {
            transactionId: persistedTransaction?.id,
            eventId: createPaymentDto.eventId,
            status: TransactionStatus.pending,
            studentId: createPaymentDto.studentId
        } as EventPayment;

        const persistedEventPayment = await this.prisma.eventPayment.create({ data: eventPayment });

        return persistedEventPayment;
    }
}
