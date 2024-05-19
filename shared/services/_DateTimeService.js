"use strict";
exports.__esModule = true;
exports.DateTimeService = void 0;
var DateTimeService = /** @class */ (function () {
    function DateTimeService() {
    }
    DateTimeService.addTime = function (date, hours, minutes) {
        var offset = hours * 60 * 60 * 1000;
        if (minutes) {
            offset += minutes * 60 * 1000;
        }
        return new Date(date.getTime() + offset);
    };
    DateTimeService.withTime = function (date, hours, minutes) {
        var d = DateTimeService.date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        return DateTimeService.addTime(d, hours, minutes);
    };
    DateTimeService.date = function (year, month, day) {
        return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
    };
    DateTimeService.daysBetween = function (periodFrom, periodTo) {
        var days = [];
        var start = periodFrom;
        while (start <= periodTo) {
            days.push(start);
            start = this.addDays(start, 1);
        }
        return days;
    };
    DateTimeService.addDays = function (date, days) {
        return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    };
    DateTimeService.isSameDate = function (d1, d2) {
        if ((d1 || null) === (d2 || null))
            return true;
        if (!d1 || !d2)
            return false;
        return d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() === d2.getUTCMonth() && d1.getUTCDate() === d2.getUTCDate();
    };
    DateTimeService.dayOfWeek = function (day) {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day];
    };
    DateTimeService.toFirstDayOfMonth = function (date) {
        return this.date(date.getUTCFullYear(), date.getUTCMonth(), 1);
    };
    DateTimeService.toLastDayOfMonth = function (date) {
        return this.date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0);
    };
    DateTimeService.diffDays = function (to, from) {
        var date1WithoutTime = this.withTime(to, 0, 0);
        var date2WithoutTime = this.withTime(from, 0, 0);
        var diff = date1WithoutTime.getTime() - date2WithoutTime.getTime();
        return Math.ceil(diff / (24 * 60 * 60 * 1000));
    };
    DateTimeService.diffMonths = function (dateFrom, dateTo) {
        var months = dateTo.getUTCFullYear() * 12 + dateTo.getUTCMonth() - dateFrom.getFullYear() * 12 - dateFrom.getUTCMonth();
        return months;
    };
    DateTimeService.diffYears = function (dateFrom, dateTo) {
        var years = dateTo.getUTCFullYear() - dateFrom.getFullYear();
        return years;
    };
    DateTimeService.numberOfWeek = function (date) {
        var result = 0;
        var day = this.toFirstDayOfMonth(date);
        do {
            if (day.getDay() === date.getDay())
                result++;
            day = this.addDays(day, 1);
        } while (day < date && !this.isSameDate(day, date));
        return result;
    };
    DateTimeService.daysMap = new Map([[1, '']]);
    return DateTimeService;
}());
exports.DateTimeService = DateTimeService;
