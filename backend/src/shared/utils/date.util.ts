import { format } from 'date-fns';

const DAY_FORMAT = 'yyyy-MM-dd';

export function formatDay(date: Date) {
    return format(date, DAY_FORMAT);
}

export function getYesterday() {
    const day = new Date();
    day.setDate(day.getDate() - 1);
    return day;
}
