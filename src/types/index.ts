export interface Prayer {
    key: string;
    label: string;
}

export interface PrayerTime {
    minutes: number;
    label: string;
}

export type PrayerTimes = Record<string, PrayerTime>;

export interface DaySchedule {
    date: Date;
    isoKey: string;
    dayNum: number;
    weekday: string;
    isFriday: boolean;
    times: PrayerTimes;
}

export interface MonthSchedule {
    year: number;
    month: number;
    monthName: string;
    days: DaySchedule[];
}

export interface NextPrayer {
    label: string;
    time: string;
    minutesUntil: number;
    isTomorrow: boolean;
}
