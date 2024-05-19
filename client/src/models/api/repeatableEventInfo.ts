import { FrequencyType } from "../enums/frequency.type";

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