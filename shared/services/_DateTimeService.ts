export class DateTimeService {
    static daysMap = new Map<number, string>([[1, '']]);

    static addTime(date: Date, hours: number, minutes?: number): Date {
        let offset = hours * 60 * 60 * 1000;
        if (minutes) {
            offset += minutes * 60 * 1000;
        }

        return new Date(date.getTime() + offset);
    }

    static withTime(date: Date, hours: number, minutes: number): Date {
        const d = DateTimeService.date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

        return DateTimeService.addTime(d, hours, minutes);
    }

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

    static diffDays(to: Date, from: Date): number {
        const date1WithoutTime = this.withTime(to, 0, 0);
        const date2WithoutTime = this.withTime(from, 0, 0);
        const diff = date1WithoutTime.getTime() - date2WithoutTime.getTime();
        return Math.ceil(diff / (24 * 60 * 60 * 1000));
    }

    static diffMonths(dateFrom: Date, dateTo: Date) {
        const months = dateTo.getUTCFullYear() * 12 + dateTo.getUTCMonth() - dateFrom.getFullYear() * 12 - dateFrom.getUTCMonth();
        return months;
    }

    static diffYears(dateFrom: Date, dateTo: Date) {
        const years = dateTo.getUTCFullYear() - dateFrom.getFullYear();
        return years;
    }

    static numberOfWeek(date: Date) {
        let result = 0;
        let day = this.toFirstDayOfMonth(date);

        do {
            if (day.getDay() === date.getDay()) result++;

            day = this.addDays(day, 1);
        } while (day < date && !this.isSameDate(day, date));

        return result;
    }
}
