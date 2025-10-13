export const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const months_length: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function prevMonth(date: Date) {
    let newDate = new Date(date);
    if (newDate.getDate() > 0) {
        newDate.setMonth(date.getMonth() - 1);
    } else {
        newDate.setMonth(11);
        newDate.setFullYear(newDate.getFullYear() - 1);
    }
    return newDate
}

export function nextMonth(date: Date) {
    let newDate = new Date(date);
    if (newDate.getMonth() < 11) {
        newDate.setMonth(date.getMonth() + 1);
    } else {
        newDate.setMonth(0);
        newDate.setFullYear(newDate.getFullYear() + 1);
    }
    return(newDate)
}

function calendarOffset(date: Date): number {
    const first: Date = new Date(date);
    return first.getDay() !== 0 ? (first.getDay() - 1) : 6;
}

export function calendarList(date: Date): Date[] {
    const result: Date[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of month
    const first = new Date(year, month, 1);
    const offset = calendarOffset(first);

    // Previous month fill
    const prev = prevMonth(first);
    const prevMonthLength = (prev.getMonth() === 1 && isLeapYear(prev.getFullYear()))
        ? 29 : months_length[prev.getMonth()];
    for (let i = offset - 1; i >= 0; i--) {
        result.push(new Date(prev.getFullYear(), prev.getMonth(), prevMonthLength - i));
    }

    // Current month
    const monthLength = (month === 1 && isLeapYear(year)) ? 29 : months_length[month];
    for (let i = 1; i <= monthLength; i++) {
        result.push(new Date(year, month, i));
    }

    // Next month fill
    let nextDay = 1;
    while (result.length % 7 !== 0) {
        const next = nextMonth(first);
        result.push(new Date(next.getFullYear(), next.getMonth(), nextDay));
        nextDay++;
    }

    return result;
}
