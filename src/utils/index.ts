export const getYearsList = (startYear: number | undefined, endYear: number | undefined): string[] => {
    const now = new Date().getFullYear();
    let period = 20,
        d = 0.5;
    if (startYear && endYear) {
        period = endYear - startYear;
        if (endYear === now) d = 1;
        else if (now === startYear) d = 0;
        else d = (period - (endYear - now)) / period;
    }
    if (startYear && !endYear) {
        period = now - startYear + 10;
        if (now === startYear) d = 0;
        else d = (period - 10) / period;
    }
    if (!startYear && endYear) {
        period = endYear - now + 10;
        if (endYear === now) d = 1;
        else d = (period - (endYear - now)) / period;
    }
    return Array.from({ length: period + 1 }, (e, i) => {
        if (d) return String(now - period * d + i);
        else return String(now + i);
    });
};
export const getMonthLength = (timestamp: number): number => {
    const year = new Date(timestamp).getFullYear();
    const month = new Date(timestamp).getMonth();
    return 33 - new Date(year, month, 33).getDate();
};
export const getMonthList = (): string[] => {
    return Array.from({ length: 12 }, (e, i) => {
        let result = new Date(0, i + 1, 0).toLocaleDateString('ru', { month: 'long' });
        result = result.charAt(0).toUpperCase() + result.substr(1);
        return result;
    });
};
export const getDaysOfMonth = (timestamp: number): string[] => {
    return Array.from({ length: getMonthLength(timestamp) }, (e, i) => {
        return new Date(0, 0, i + 1).toLocaleDateString('ru', { day: '2-digit' });
    });
};
export const getHoursList = (): string[] => {
    return Array.from({ length: 24 }, (e, i) => {
        return new Date(0, 0, 0, i, 0).toLocaleTimeString('ru', { hour: '2-digit' });
    });
};
export const getMinutesList = (): string[] => {
    return Array.from({ length: 60 }, (e, i) => {
        return new Date(0, 0, 0, 0, i, 0)
            .toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
            .split(':')[1];
    });
};
