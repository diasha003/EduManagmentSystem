import { FrequencyType } from "../enums";

export interface EventsFilter {
    userId: number;
    dateFrom: Date;
    dateTo: Date;
}

export interface EventDto {
    teacherId: number;
    studentId?: number;
    date: Date;
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
}

export interface RepeatableEventInfo {
    frequency: FrequencyType;
    repeatOnDaily: string[];
    repeatOnMonthly: string;
    repeatUntil?: Date;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;
}

export interface QuickLessonModel {
    teacher: number;
    student: number;
    date: Date;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;

    repeatableEventInfo?: RepeatableEventInfo;
}
