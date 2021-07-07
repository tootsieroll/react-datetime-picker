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
export const getYearsList = (period = 20): string[] => {
    return Array.from({ length: period }, (e, i) => {
        return String(new Date().getFullYear() - period / 2 + i);
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
