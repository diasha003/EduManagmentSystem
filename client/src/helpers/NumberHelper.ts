export function nthNumber(number: number) {
    if (number > 3 && number < 21) return 'th';
    switch (number % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export function dayOfWeek(day: number): string {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day];
}

export function monthOfYear(month: number): string {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
}

export function getNumberOfWeek(date: Date) {
    const adjustedDate = date.getDate();
    const prefixes = ['0', '1', '2', '3', '4', '5'];
    return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
}
