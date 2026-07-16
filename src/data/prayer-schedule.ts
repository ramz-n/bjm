import type { DaySchedule, MonthSchedule, NextPrayer, Prayer, PrayerTimes } from "../types";

export const PRAYERS: Prayer[] = [
    { key: "fajr", label: "Fajr" },
    { key: "zuhr", label: "Zuhr" },
    { key: "asr", label: "Asr" },
    { key: "magrib", label: "Magrib" },
    { key: "isha", label: "Isha" }
];

const BASE_MINUTES: Record<string, number> = {
    fajr: 3 * 60 + 38,
    zuhr: 11 * 60 + 51,
    asr: 15 * 60 + 38,
    magrib: 17 * 60 + 14,
    isha: 18 * 60 + 35
};

const DIFFERENCE: Record<string, number> = {
    fajr: 100,
    zuhr: 30,
    asr: 65,
    magrib: 116,
    isha: 125
};

function dayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
}

function minutesForPrayer(prayerKey: string, date: Date): number {
    const doy = dayOfYear(date);
    const phase = ((doy - 80) / 365) * Math.PI * 2;
    const swing = Math.sin(phase) * DIFFERENCE[prayerKey];
    return Math.round(BASE_MINUTES[prayerKey] + swing);
}

function formatMinutes(total: number): string {
    const h24 = Math.floor(total / 60) % 24;
    const m = total % 60;
    const period = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getMonthSchedule(referenceDate: Date = new Date()): MonthSchedule {
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: DaySchedule[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const times: PrayerTimes = {};
        for (const slot of PRAYERS) {
            const minutes = minutesForPrayer(slot.key, date);
            times[slot.key] = { minutes, label: formatMinutes(minutes) };
        }
        days.push({
            date,
            isoKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
            dayNum: d,
            weekday: WEEKDAYS[date.getDay()],
            isFriday: date.getDay() === 5,
            times,
        });
    }

    return {
        year,
        month,
        monthName: referenceDate.toLocaleString("en-US", { month: "long" }),
        days,
    };
}

export function isoKeyFor(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function formatFullDate(date: Date): string {
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function findNextPrayer(
    now: Date,
    todayEntry: DaySchedule,
    tomorrowFirstEntry?: DaySchedule
): NextPrayer | null {
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    for (const prayer of PRAYERS) {
        const t = todayEntry.times[prayer.key];
        if (t.minutes >= nowMinutes) {
            return {
                label: prayer.label,
                time: t.label,
                minutesUntil: t.minutes - nowMinutes,
                isTomorrow: false,
            };
        }
    }

    if (tomorrowFirstEntry) {
        const t = tomorrowFirstEntry.times[PRAYERS[0].key];
        const minutesUntil = 24 * 60 - nowMinutes + t.minutes;
        return {
            label: PRAYERS[0].label,
            time: t.label,
            minutesUntil,
            isTomorrow: true,
        };
    }

    return null;
}


export function formatCountdown(minutesUntil: number): string {
    const h = Math.floor(minutesUntil / 60);
    const m = minutesUntil % 60;
    if (h <= 0) return `${m} min`;
    if (m === 0) return `${h} hr`;
    return `${h} hr ${m} min`;
}