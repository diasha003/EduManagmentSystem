import { RepeatableEventInfo } from './repeatableEventInfo';

export interface QuickLessonModel {
    teacher: string;
    student: string;
    date: Date;
    time: Date;
    isPublic?: boolean;
    stateMakeUpCredit?: boolean;

    repeatableEventInfo?: RepeatableEventInfo;
}
