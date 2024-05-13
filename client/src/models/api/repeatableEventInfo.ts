import { FrequencyType } from "../enums/frequency.type";

export interface RepeatableEventInfo {
    frequency: FrequencyType;
    repeatOn: string | string[];
    repeatUntil?: Date;
    repeatIdentity?: boolean;
    everyWeek?: number;
    everyMonth?: number;
    everyYear?: number;
}