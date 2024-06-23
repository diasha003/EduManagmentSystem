import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventPayment, Prisma, Transaction, TransactionStatus, TransactionType } from '@prisma/client';
import { ConfirmTransactionDto, ConfirmationResultDto, CreateEventPaymentDto, CreateIntentDto, EventPaymentDto, IntentDto } from 'shared/models';
import { DateTimeService } from 'shared/services';
import { DatabaseService } from 'src/database/database.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private stripe = new Stripe('sk_test_51PT7Zk2N9fhAMMcv7PB3TadVa4WJg93OuPXuoAmgxBbMl8fupBhsSwE50WSti2j8UoFBn8QjLTot1BDnc3TVGUd100jrT3BzT2');

    constructor(
        private readonly prisma: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    async pay(params: CreateIntentDto): Promise<IntentDto> {
        const transaction = await this.prisma.transaction.findFirst({
            where: {
                id: params.transactionId
            }
        });

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: transaction.amount.toNumber() * 100,
            currency: transaction.currencyCode,
            automatic_payment_methods: {
                enabled: true
            }
        });

        await this.prisma.transaction.update({
            where: {
                id: transaction.id
            },
            data: {
                intentId: paymentIntent.id
            }
        });

        return {
            clientSecret: paymentIntent.client_secret
        };
    }

    async getEventsPayment(headers: any): Promise<EventPaymentDto[]> {
        const decoded: { id: number; roles: string[]; centerName: string } = this.jwtService.decode(headers.authorization.split(' ')[1]);

        const data = await this.prisma.transaction.findMany({
            where: {
                student: {
                    centerName: {
                        equals: decoded.centerName
                    }
                }
            },
            include: {
                student: {
                    include: {
                        familyStudentsAsParent: {
                            include: {
                                parent: true
                            }
                        }
                    }
                }
            }
        });

        return data.map((x) => ({ ...x, amount: x.amount.toNumber() }));
    }

    async assignPayment(createPaymentDto: CreateEventPaymentDto) {
        const shouldInitTransaction = createPaymentDto.price && createPaymentDto.price !== createPaymentDto.amountPaid;

        if (createPaymentDto.amountPaid) {
            const paidTransaction = {
                amount: new Prisma.Decimal(createPaymentDto.amountPaid),
                description: 'Paid in cash',
                currencyCode: 'BYN',
                timestamp: new Date(),
                type: TransactionType.payment,
                studentId: createPaymentDto.studentId,
                teacherId: createPaymentDto.teacherId,
                status: TransactionStatus.paid
            } as Transaction;

            await this.prisma.transaction.create({ data: paidTransaction });
        }

        const transaction = shouldInitTransaction
            ? ({
                  amount: new Prisma.Decimal(createPaymentDto.price - (createPaymentDto.amountPaid ?? 0)),
                  description: createPaymentDto.note,
                  currencyCode: 'BYN',
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

    async getUnpaidTransactions() {
        const query = await this.prisma.transaction.findMany({
            where: {
                status: TransactionStatus.pending,
                type: TransactionType.charge
            }
        });

        return query;
    }

    async getTransactionActualStatus(transaction: Transaction) {
        if (!transaction.intentId) throw new Error('Cannot get actual status of transaction without intentId');

        return await this.stripe.paymentIntents.retrieve(transaction.intentId);
    }

    async succeedTransaction(transaction: Transaction) {
        await this.prisma.transaction.update({
            where: {
                id: transaction.id
            },
            data: {
                status: TransactionStatus.paid
            }
        });

        const incomeTransaction = {
            amount: new Prisma.Decimal(transaction.amount),
            description: 'Paid',
            currencyCode: 'BYN',
            timestamp: new Date(),
            type: TransactionType.payment,
            studentId: transaction.studentId,
            teacherId: transaction.teacherId,
            status: TransactionStatus.paid
        } as Transaction;

        await this.prisma.transaction.create({ data: incomeTransaction });
    }

    async cancelTransaction(transaction: Transaction) {
        this.prisma.transaction.update({
            where: {
                id: transaction.id
            },
            data: {
                status: TransactionStatus.canceled
            }
        });
    }

    async confirmTransaction(confirmation: ConfirmTransactionDto): Promise<ConfirmationResultDto> {
        const actualStatus = await this.stripe.paymentIntents.retrieve(confirmation.intentId);
        if (actualStatus.status === 'succeeded') {
            const transaction = await this.prisma.transaction.findFirst({
                where: {
                    id: confirmation.transactionId
                }
            });

            let receipt_url: string | undefined;
            if (actualStatus.latest_charge) {
                const charge = await this.stripe.charges.retrieve(actualStatus.latest_charge.toString());
                receipt_url = charge.receipt_url;
            }

            await this.succeedTransaction(transaction);

            return {
                receiptUrl: receipt_url
            }
        }
    }
}
