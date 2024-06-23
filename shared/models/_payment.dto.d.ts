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
    amount: number;
    timestamp: Date;
    description?: string;
    type: string;
    student: {
        familyStudentsAsParent: {
            parent: User;
        }[];
    };
}
export interface CreateIntentDto {
    transactionId: number;
}
export interface IntentDto {
    clientSecret: string;
}
export interface ConfirmTransactionDto {
    transactionId: number;
    intentId: string;
}
export interface EventStudentDto {
    id: number;
    status: string;
    studentId: number;
    transactionId: number;
    event: {
        date: Date;
        duration: number;
        teacher: {
            firstName: string;
            lastName: string;
        };
    };
}
