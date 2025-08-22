
export function addMonthToCurrentDate(month: number = 0): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    return date;
}

export function getCurrentDateInFormatMM_YYYY(date: Date, currentDateLocale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(currentDateLocale, {
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

export function getFutureDateByMonthInFormatMM_YYYY(month: number): string {
    return getCurrentDateInFormatMM_YYYY(addMonthToCurrentDate(month));
}