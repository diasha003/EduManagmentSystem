"use strict";
exports.__esModule = true;
exports.DateTimeService = void 0;
var DateTimeService = /** @class */ (function () {
    function DateTimeService() {
    }
    DateTimeService.addMinutes = function (date, minutes) {
        return new Date(date.getTime() + minutes * 60 * 1000);
    };
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
    DateTimeService.toUiDate = function (value) {
        if (!(value instanceof Date))
            throw new Error("Expected date, but found: ".concat(typeof value, ": ").concat(value));
        var d = value.getUTCDate().toString();
        var m = (value.getUTCMonth() + 1).toString();
        d = d.length === 1 ? '0' + d : d;
        m = m.length === 1 ? '0' + m : m;
        return d + '.' + m + '.' + value.getUTCFullYear();
    };
    DateTimeService.toUiTime = function (value, useSwissTime) {
        if (!(value instanceof Date))
            throw new Error("Expected date, but found: ".concat(typeof value, ": ").concat(value));
        if (isNaN(value.getTime()))
            return '~';
        var h = value.getUTCHours().toString();
        var mm = value.getUTCMinutes().toString();
        h = h.length === 1 ? '0' + h : h;
        mm = mm.length === 1 ? '0' + mm : mm;
        return h + ':' + mm + (useSwissTime ? '.' : '');
    };
    DateTimeService.toUiTimeSeconds = function (value, useSwissTime) {
        if (!(value instanceof Date))
            throw new Error("Expected date, but found: ".concat(typeof value, ": ").concat(value));
        if (isNaN(value.getTime()))
            return '~';
        var h = value.getUTCHours().toString();
        var mm = value.getUTCMinutes().toString();
        var ss = value.getUTCSeconds().toString();
        h = h.length === 1 ? '0' + h : h;
        mm = mm.length === 1 ? '0' + mm : mm;
        ss = ss.length === 1 ? '0' + ss : ss;
        return h + ':' + mm + ':' + ss + (useSwissTime ? '.' : '');
    };
    DateTimeService.toUiTimestamp = function (value, showMS) {
        if (!(value instanceof Date))
            throw new Error("Expected date, but found: ".concat(typeof value, ": ").concat(value));
        var d = value.getUTCDate().toString();
        var m = (value.getUTCMonth() + 1).toString();
        var h = value.getUTCHours().toString();
        var mm = value.getUTCMinutes().toString();
        var s = value.getUTCSeconds().toString();
        var ms = showMS ? ".".concat(value.getUTCMilliseconds()) : '';
        d = d.length === 1 ? "0".concat(d) : d;
        m = m.length === 1 ? "0".concat(m) : m;
        h = h.length === 1 ? "0".concat(h) : h;
        mm = mm.length === 1 ? "0".concat(mm) : mm;
        s = s.length === 1 ? "0".concat(s) : s;
        return "".concat(d, ".").concat(m, ".").concat(value.getUTCFullYear(), " ").concat(h, ":").concat(mm, ":").concat(s).concat(ms);
    };
    DateTimeService.toUiSeconds = function (seconds) {
        var sec = Math.trunc(seconds);
        var isNegative = sec < 0;
        var positiveSec = isNegative ? -sec : sec;
        var h = Math.trunc(positiveSec / (60 * 60));
        var m = Math.trunc(positiveSec / 60) - h * 60;
        var mm = m.toString();
        var hh = h.toString();
        mm = mm.length === 1 ? '0' + mm : mm;
        hh = hh.length === 1 ? '0' + hh : hh;
        return (isNegative ? '-' : '') + hh + ':' + mm;
    };
    DateTimeService.toUiMiliseconds = function (miliseconds) {
        var sec = Math.trunc(miliseconds / 1000);
        var isNegative = sec < 0;
        var h = Math.abs(Math.trunc(sec / (60 * 60)));
        var m = Math.abs(Math.trunc(sec / 60) - h * 60);
        var s = Math.abs(Math.trunc(sec - h * 60 * 60 - m * 60));
        var mm = m.toString();
        var hh = h.toString();
        var ss = s.toString();
        mm = mm.length === 1 ? '0' + mm : mm;
        hh = hh.length === 1 ? '0' + hh : hh;
        ss = ss.length === 1 ? '0' + ss : ss;
        return (isNegative ? '-' : '') + hh + ':' + mm + ':' + ss;
    };
    DateTimeService.toUiDiffTime = function (to, from) {
        var diffMinutes = this.diffMinutes(to, from);
        if (diffMinutes < 60) {
            return Math.round(diffMinutes) + 'm';
        }
        var diffHours = this.diffHours(to, from);
        if (diffHours < 24) {
            return Math.round(diffHours) + 'h';
        }
        return Math.round(this.diffDays(to, from)) + 'd';
    };
    DateTimeService.diffMinutes = function (to, from) {
        var diff = to.getTime() - from.getTime();
        return Math.ceil(diff / (60 * 1000));
    };
    DateTimeService.diffHours = function (to, from) {
        var diff = to.getTime() - from.getTime();
        return diff / (60 * 60 * 1000);
    };
    DateTimeService.daysMap = new Map([[1, '']]);
    return DateTimeService;
}());
exports.DateTimeService = DateTimeService;
