export const parseTimeStringToInt = (time: string) => parseInt(time.substring(0, 2), 10);
export const parseIntToTimeString = (int: number) => int + ':00:00';