export const parseTimeStringToInt = (time: string): number => parseInt(time.substring(0, 2), 10);
export const parseIntToTimeString = (int: number): string => int + ':00:00';