import { FrequencyType } from '../enums';
export declare class EventsFilter {
    userId: number;
    dateFrom: Date;
    dateTo: Date;
}
export declare class EventDto {
    teacherId: number;
    studentId?: number;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;
    frequency?: string;
    repeatOnDaily?: string[];
    repeatOnMonthly?: string;
    repeatUntil?: Date;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;
    date: Date;
}
export declare class RepeatableEventInfo {
    frequency: FrequencyType;
    repeatOnDaily: string[];
    repeatOnMonthly: string;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;
    repeatUntil?: Date;
}
export declare class QuickLessonModel {
    teacher: number;
    student: number;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;
    repeatableEventInfo?: RepeatableEventInfo;
    date: Date;
}
