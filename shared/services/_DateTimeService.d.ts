export declare class DateTimeService {
    static daysMap: Map<number, string>;
    static addTime(date: Date, hours: number, minutes?: number): Date;
    static withTime(date: Date, hours: number, minutes: number): Date;
    static date(year: number, month: number, day: number): Date;
    static daysBetween(periodFrom: Date, periodTo: Date): Date[];
    static addDays(date: Date, days: number): Date;
    static isSameDate(d1: Date | null | undefined, d2: Date | null | undefined): boolean;
    static dayOfWeek(day: number): string;
    static toFirstDayOfMonth(date: Date): Date;
    static toLastDayOfMonth(date: Date): Date;
    static diffDays(to: Date, from: Date): number;
    static diffMonths(dateFrom: Date, dateTo: Date): number;
    static diffYears(dateFrom: Date, dateTo: Date): number;
    static numberOfWeek(date: Date): number;
}
