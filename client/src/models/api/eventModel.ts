export interface EventModel {
    teacherId: number;
    studentId?: number;
    date: Date;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;
    frequency?: string;
    repeatOn?: string[];
    repeatUntil?: Date;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;
}