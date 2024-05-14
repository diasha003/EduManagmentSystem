export default class DateTimeService {
    static daysMap = new Map<number, string>([[1, '']]);

    static date(year: number, month: number, day: number): Date {
        return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    }
    
    static daysBetween(periodFrom: Date, periodTo: Date): Date[] {
        const days: Date[] = [];
        let start = periodFrom;

        while (start <= periodTo) {
            days.push(start);
            start = this.addDays(start, 1);
        }

        return days;
    }

    static addDays(date: Date, days: number): Date {
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    }

    static isSameDate(d1: Date | null | undefined, d2: Date | null | undefined): boolean {
        if ((d1 || null) === (d2 || null)) return true;
        if (!d1 || !d2) return false;

        return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
    }

    static dayOfWeek(day: number): string {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
    }

    static toFirstDayOfMonth(date: Date): Date {
        return this.date(date.getUTCFullYear(), date.getUTCMonth(), 1);
    }

    static toLastDayOfMonth(date: Date): Date {
        return this.date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
    }
}
