export interface CreateEventPaymentDto {
    status: string;
    studentId: number;
    teacherId: number;
    eventId: number;
    price?: number;
    amountPaid?: number;
    note?: string;
}