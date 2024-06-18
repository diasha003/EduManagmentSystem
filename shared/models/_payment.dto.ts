import Decimal from 'decimal.js';
import { User } from './_user.dto';

export interface CreateEventPaymentDto {
    status: string;
    studentId: number;
    teacherId: number;
    eventId: number;
    price?: number;
    amountPaid?: number;
    note?: string;
}

export interface EventPaymentDto {
    id: number;
    status: string;
    studentId: number;
    teacherId: number;
    amount: Decimal;
    timestamp: Date;
    description?: string;
    type: string;
    student: {
        familyStudentsAsParent: {
            parent: User;
        }[];
    };
}
