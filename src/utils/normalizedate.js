export const normalizeDate = (date, locale = 'en-US') => {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
        console.warn('Invalid date:', date);
        return 'Invalid date';
    }

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(dateObj);
}