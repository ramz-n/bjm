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
    key: string;
    label: string;
    time: string;
    minutes: number;
    minutesUntil: number;
    isTomorrow: boolean;
}

export interface LinkItem {
    title: string;
    path?: string;
    submenu?: LinkItem[];
}
