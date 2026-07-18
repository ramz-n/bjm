import type { DaySchedule, MonthSchedule, NextPrayer, Prayer, PrayerTimes } from "../types";

const LATITUDE = 27.69;
const LONGITUDE = 84.43;
const TIMEZONE_OFFSET = 5.75;

const FAJR_ANGLE = 18.0;
const ISHA_ANGLE = 18.0;
const ZUHR_BUFFER = 4;
const HORIZON_BUFFER = 1.15;

export const PRAYERS: Prayer[] = [
    { key: "fajr", label: "Fajr" },
    { key: "sunrise", label: "Sunrise" },
    { key: "zuhr", label: "Zuhr" },
    { key: "asr", label: "Asr" },
    { key: "magrib", label: "Magrib" },
    { key: "isha", label: "Isha" }
];

function dayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
}

function minutesForPrayer(prayerKey: string, date: Date): number {
    const doy = dayOfYear(date);

    const b = (360 / 365) * (doy - 81);
    const bRad = (b * Math.PI) / 180;
    const eot = 9.87 * Math.sin(2 * bRad) - 7.53 * Math.cos(bRad) - 1.5 * Math.sin(bRad);

    const declination = 23.45 * Math.sin(((360 / 365) * (doy - 80) * Math.PI) / 180);
    const declRad = (declination * Math.PI) / 180;
    const latRad = (LATITUDE * Math.PI) / 180;

    const standardMeridian = TIMEZONE_OFFSET * 15;
    const longitudeCorrection = (standardMeridian - LONGITUDE) * 4;
    const solarNoon = 12 * 60 + longitudeCorrection - eot;

    const getHourAngle = (alphaDeg: number): number => {
        const alphaRad = (alphaDeg * Math.PI) / 180;
        const cosH = (Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(declRad)) /
            (Math.cos(latRad) * Math.cos(declRad));

        if (cosH > 1) return 0;
        if (cosH < -1) return 180;
        return (Math.acos(cosH) * 180) / Math.PI;
    };

    switch (prayerKey) {
        case "fajr": {
            const hourAngle = getHourAngle(-FAJR_ANGLE);
            return Math.round(solarNoon - hourAngle * 4);
        }
        case "sunrise": {
            const hourAngle = getHourAngle(-HORIZON_BUFFER);
            return Math.round(solarNoon - hourAngle * 4);
        }
        case "zuhr": {
            return Math.round(solarNoon + ZUHR_BUFFER);
        }
        case "asr": {
            const shadowMultiplier = 2;
            const asrAltitudeRad = Math.atan(1 / (shadowMultiplier + Math.tan(Math.abs(latRad - declRad))));
            const asrAltitudeDeg = (asrAltitudeRad * 180) / Math.PI;
            const hourAngle = getHourAngle(asrAltitudeDeg);
            return Math.round(solarNoon + hourAngle * 4);
        }
        case "magrib": {
            const hourAngle = getHourAngle(-HORIZON_BUFFER);
            return Math.round(solarNoon + hourAngle * 4);
        }
        case "isha": {
            const hourAngle = getHourAngle(-ISHA_ANGLE);
            return Math.round(solarNoon + hourAngle * 4);
        }
        default:
            return 0;
    }
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

        if (prayer.key === "sunrise") continue;

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