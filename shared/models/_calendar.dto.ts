import { IsDateString, IsNumber } from 'class-validator';
import { FrequencyType } from '../enums';
import { Type } from 'class-transformer';

export class EventsFilter {
    @IsNumber()
    userId: number;

    @IsDateString()
    @Type(() => Date)
    dateFrom: Date;

    @IsDateString()
    @Type(() => Date)
    dateTo: Date;
}

export class EventDto {
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

    @IsDateString()
    @Type(() => Date)
    date: Date;
}

export class RepeatableEventInfo {
    frequency: FrequencyType;
    repeatOnDaily: string[];
    repeatOnMonthly: string;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;

    @IsDateString()
    @Type(() => Date)
    repeatUntil?: Date;
}

export class QuickLessonModel {
    teacher: number;
    student: number;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;
    repeatableEventInfo?: RepeatableEventInfo;

    @IsDateString()
    @Type(() => Date)
    date: Date;
}
