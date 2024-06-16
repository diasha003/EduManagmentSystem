import { FrequencyType } from '../enums';
import { ShortUserDto } from './_user.dto';
export declare class EventsFilter {
    userId: number;
    dateFrom: Date;
    dateTo: Date;
}
export declare class CreateEventDto {
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
    duration: number;
    publicDescription?: string;
    privateDescription?: string;
}
export declare class EventDto {
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
    date: Date;
    duration: number;
    publicDescription?: string;
    privateDescription?: string;
}
export declare class EventDetailsDto {
    teacher: ShortUserDto;
    students: ShortUserDto[];
    date: Date;
    duration: number;
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
