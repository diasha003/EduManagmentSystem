export class DateTimeService {
    static daysMap = new Map<number, string>([[1, '']]);

    static addMinutes(date: Date, minutes: number): Date {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }
    
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

    static toUiDate(value: Date): string {
        if (!(value instanceof Date)) throw new Error(`Expected date, but found: ${typeof value}: ${value}`);

        let d = value.getUTCDate().toString();
        let m = (value.getUTCMonth() + 1).toString();

        d = d.length === 1 ? '0' + d : d;
        m = m.length === 1 ? '0' + m : m;

        return d + '.' + m + '.' + value.getUTCFullYear();
    }

    static toUiTime(value: Date, useSwissTime?: boolean): string {
        if (!(value instanceof Date)) throw new Error(`Expected date, but found: ${typeof value}: ${value}`);

        if (isNaN(value.getTime())) return '~';
        let h = value.getUTCHours().toString();
        let mm = value.getUTCMinutes().toString();

        h = h.length === 1 ? '0' + h : h;
        mm = mm.length === 1 ? '0' + mm : mm;

        return h + ':' + mm + (useSwissTime ? '.' : '');
    }

    static toUiTimeSeconds(value: Date, useSwissTime?: boolean): string {
        if (!(value instanceof Date)) throw new Error(`Expected date, but found: ${typeof value}: ${value}`);

        if (isNaN(value.getTime())) return '~';
        let h = value.getUTCHours().toString();
        let mm = value.getUTCMinutes().toString();
        let ss = value.getUTCSeconds().toString();

        h = h.length === 1 ? '0' + h : h;
        mm = mm.length === 1 ? '0' + mm : mm;
        ss = ss.length === 1 ? '0' + ss : ss;

        return h + ':' + mm + ':' + ss + (useSwissTime ? '.' : '');
    }

    static toUiTimestamp(value: Date, showMS?: boolean): string {
        if (!(value instanceof Date)) throw new Error(`Expected date, but found: ${typeof value}: ${value}`);

        let d = value.getUTCDate().toString();
        let m = (value.getUTCMonth() + 1).toString();
        let h = value.getUTCHours().toString();
        let mm = value.getUTCMinutes().toString();
        let s = value.getUTCSeconds().toString();
        let ms = showMS ? `.${value.getUTCMilliseconds()}` : '';

        d = d.length === 1 ? `0${d}` : d;
        m = m.length === 1 ? `0${m}` : m;
        h = h.length === 1 ? `0${h}` : h;
        mm = mm.length === 1 ? `0${mm}` : mm;
        s = s.length === 1 ? `0${s}` : s;
        return `${d}.${m}.${value.getUTCFullYear()} ${h}:${mm}:${s}${ms}`;
    }

    static toUiSeconds(seconds: number): string {
        const sec = Math.trunc(seconds);
        const isNegative = sec < 0;
        const positiveSec = isNegative ? -sec : sec;
        const h = Math.trunc(positiveSec / (60 * 60));
        const m = Math.trunc(positiveSec / 60) - h * 60;
        let mm = m.toString();
        let hh = h.toString();

        mm = mm.length === 1 ? '0' + mm : mm;
        hh = hh.length === 1 ? '0' + hh : hh;

        return (isNegative ? '-' : '') + hh + ':' + mm;
    }

    static toUiMiliseconds(miliseconds: number): string {
        const sec = Math.trunc(miliseconds / 1000);
        const isNegative = sec < 0;
        const h = Math.abs(Math.trunc(sec / (60 * 60)));
        const m = Math.abs(Math.trunc(sec / 60) - h * 60);
        const s = Math.abs(Math.trunc(sec - h * 60 * 60 - m * 60));
        let mm = m.toString();
        let hh = h.toString();
        let ss = s.toString();

        mm = mm.length === 1 ? '0' + mm : mm;
        hh = hh.length === 1 ? '0' + hh : hh;
        ss = ss.length === 1 ? '0' + ss : ss;

        return (isNegative ? '-' : '') + hh + ':' + mm + ':' + ss;
    }

    static toUiDiffTime(to: Date, from: Date) {
        const diffMinutes = this.diffMinutes(to, from);
        if (diffMinutes < 60) {
            return Math.round(diffMinutes) + 'm';
        }

        const diffHours = this.diffHours(to, from);
        if (diffHours < 24) {
            return Math.round(diffHours) + 'h';
        }

        return Math.round(this.diffDays(to, from)) + 'd';
    }

    static diffMinutes(to: Date, from: Date): number {
        const diff = to.getTime() - from.getTime();
        return Math.ceil(diff / (60 * 1000));
    }

    static diffHours(to: Date, from: Date): number {
        const diff = to.getTime() - from.getTime();
        return diff / (60 * 60 * 1000);
    }
}
