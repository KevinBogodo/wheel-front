import moment from "moment";

export function formatNumberWithComma(num: number): string {
    return num.toLocaleString('en-US');
};

export function formatReturnStartDate(date: string): string {
    return  moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
};

export function formatReturnEndDate(date: string): string {
    return  moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
}

export function formatReturnStartMonth(date: string): string {
    return  moment(date).startOf('month').format('YYYY-MM-DD HH:mm:ss.SSS')
};

export function formatReturnEndMonth(date: string): string {
    return  moment(date).endOf('month').format('YYYY-MM-DD HH:mm:ss.SSS')
}