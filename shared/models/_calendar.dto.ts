import { IsDateString, IsNumber } from 'class-validator';
import { FrequencyType } from '../enums';
import { ShortUserDto } from './_user.dto';
// import { Type } from 'class-transformer';

export class EventsFilter {
    @IsNumber()
    userId: number;

    @IsDateString()
    // @Type(() => Date)
    dateFrom: Date;

    @IsDateString()
    // @Type(() => Date)
    dateTo: Date;
}

export class CreateEventDto {
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
    // @Type(() => Date)
    date: Date;
    duration: number;
    publicDescription?: string;
    privateDescription?: string;
}

export class EventDto {
    teacherId: number;
    teacherDisplayName: string;
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
    // @Type(() => Date)
    date: Date;
    duration: number;
    publicDescription?: string;
    privateDescription?: string;
}

export class EventDetailsDto {
    teacher: ShortUserDto;
    students: ShortUserDto[];
    date: Date;
    duration: number;
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
    // @Type(() => Date)
    repeatUntil?: Date;
}

export class QuickLessonModel {
    teacher: number;
    student: number;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;
    repeatableEventInfo?: RepeatableEventInfo;

    @IsDateString()
    // @Type(() => Date)
    date: Date;
}
