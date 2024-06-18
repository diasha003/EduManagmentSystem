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
    price?: number;
    amountPaid?: number;
    timestamp: Date;
    note?: string;
    type: string;
    student: {
        familyStudentsAsParent: {
            parent: User;
        }[];
    };
}
