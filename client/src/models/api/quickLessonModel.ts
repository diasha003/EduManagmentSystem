import { RepeatableEventInfo } from './repeatableEventInfo';

export interface QuickLessonModel {
    teacher: number;
    student: number;
    date: Date;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;

    repeatableEventInfo?: RepeatableEventInfo;
}
