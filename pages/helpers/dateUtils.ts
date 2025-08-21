
export function addMonthToCurrentDate(month: number = 0): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    return date;
}

export function getCurrentDateInFormatMM_YYY(date: Date, currentDateLocale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(currentDateLocale, {
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}