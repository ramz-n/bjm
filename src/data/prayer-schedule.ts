import type { DaySchedule, MonthSchedule, NextPrayer, Prayer, PrayerTimes } from "../types";


const LATITUDE = 27.69918854;
const LONGITUDE = 84.42748409;
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

const GREGORIAN_MONTHS_EN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const GREGORIAN_MONTHS_NP = [
    "जनवरी",
    "फेब्रुअरी",
    "मार्च",
    "अप्रिल",
    "मे",
    "जुन",
    "जुलाई",
    "अगस्ट",
    "सेप्टेम्बर",
    "अक्टोबर",
    "नोभेम्बर",
    "डिसेम्बर",
];

const WEEKDAYS_EN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const WEEKDAYS_NP = [
    "आइतबार",
    "सोमबार",
    "मंगलबार",
    "बुधबार",
    "बिहिबार",
    "शुक्रबार",
    "शनिबार",
];

const NEPALI_DIGITS = "०१२३४५६७८९";

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
            return Math.round(solarNoon + hourAngle * 4) + 2;
        }
        case "magrib": {
            const hourAngle = getHourAngle(-HORIZON_BUFFER);
            return Math.round(solarNoon + hourAngle * 4) + 2;
        }
        case "isha": {
            const hourAngle = getHourAngle(-ISHA_ANGLE);
            return Math.round(solarNoon + hourAngle * 4);
        }
        default:
            return 0;
    }
}

function formatMinutes(total: number): string { const h24 = Math.floor(total / 60) % 24; const m = total % 60; const period = h24 >= 12 ? "PM" : "AM"; const h12 = h24 % 12 === 0 ? 12 : h24 % 12; return `${h12}:${String(m).padStart(2, "0")} ${period}`; }

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
                key: prayer.key,
                label: prayer.label,
                time: t.label,
                minutes: t.minutes,
                minutesUntil: t.minutes - nowMinutes,
                isTomorrow: false,
            };
        }
    }

    if (tomorrowFirstEntry) {
        const t = tomorrowFirstEntry.times[PRAYERS[0].key];
        const minutesUntil = 24 * 60 - nowMinutes + t.minutes;
        return {
            key: PRAYERS[0].key,
            label: PRAYERS[0].label,
            time: t.label,
            minutes: t.minutes,
            minutesUntil,
            isTomorrow: true,
        };
    }

    return null;
}

export function formatCountdown( totalMinutes: number, language: "en" | "np" = "en" ): string { const hours = Math.floor(totalMinutes / 60); const minutes = totalMinutes % 60; if (language === "np") { const nepaliHours = String(hours).replace( /\d/g, (digit) => "०१२३४५६७८९"[Number(digit)] ); const nepaliMinutes = String(minutes).replace( /\d/g, (digit) => "०१२३४५६७८९"[Number(digit)] ); if (hours > 0) { return `${nepaliHours} घण्टा ${nepaliMinutes} मिनेटमा`; } return `${nepaliMinutes} मिनेटमा`; } if (hours > 0) { return `in ${hours} hr ${minutes} mins`; } return `in ${minutes} mins`; }


export function formatCurrentTime(
    date: Date,
    language: "en" | "np" = "en"
): string {
    const hours24 = date.getHours();
    const minutes = date.getMinutes();

    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

    if (language === "en") {
        return `${hours12}:${String(minutes).padStart(2, "0")} ${
            hours24 >= 12 ? "PM" : "AM"
        }`;
    }

    const nepaliDigits = "०१२३४५६७८९";

    const toNepaliDigits = (value: string) =>
        value.replace(/\d/g, (digit) => nepaliDigits[Number(digit)]);

    const h = toNepaliDigits(String(hours12));
    const m = toNepaliDigits(String(minutes).padStart(2, "0"));

    let period = "";

    if (hours24 >= 4 && hours24 < 12) {
        period = "बिहान";
    } else if (hours24 >= 12 && hours24 < 16) {
        period = "दिउँसो";
    } else if (hours24 >= 16 && hours24 < 19) {
        period = "बेलुका";
    } else {
        period = "राति";
    }

    return `${h}:${m} ${period}`;
}



export function toNepaliDigits(value: string | number): string {
    return String(value).replace(
        /\d/g,
        (digit) => NEPALI_DIGITS[Number(digit)]
    );
}


// ------------------------------------
// Prayer time formatter
// ------------------------------------

export function formatPrayerTime(
    totalMinutes: number,
    language: "en" | "np" = "en"
): string {
    const h24 = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;

    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

    const minuteText = String(minutes).padStart(2, "0");

    if (language === "en") {
        const period = h24 >= 12 ? "PM" : "AM";

        return `${h12}:${minuteText} ${period}`;
    }

    const h = toNepaliDigits(h12);
    const m = toNepaliDigits(minuteText);

    let period: string;

    if (h24 >= 4 && h24 < 12) {
        period = "बिहान";
    } else if (h24 >= 12 && h24 < 16) {
        period = "दिउँसो";
    } else if (h24 >= 16 && h24 < 19) {
        period = "बेलुका";
    } else {
        period = "राति";
    }

    return `${h}:${m} ${period}`;
}


// ------------------------------------
// Prayer name formatter
// ------------------------------------

export function formatPrayerName(
    prayerKey: string,
    language: "en" | "np" = "en"
): string {
    if (language === "en") {
        const englishNames: Record<string, string> = {
            fajr: "Fajr",
            sunrise: "Sunrise",
            zuhr: "Zuhr",
            asr: "Asr",
            magrib: "Magrib",
            isha: "Isha",
        };

        return englishNames[prayerKey] ?? prayerKey;
    }

    const nepaliNames: Record<string, string> = {
        fajr: "फज्र",
        sunrise: "सूर्योदय",
        zuhr: "जुहर",
        asr: "असर",
        magrib: "मगरिब",
        isha: "इशा",
    };

    return nepaliNames[prayerKey] ?? prayerKey;
}


// ------------------------------------
// Gregorian date formatter
// ------------------------------------


export function formatGregorianDate(
    date: Date,
    language: "en" | "np" = "en"
): string {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const weekday = date.getDay();

    if (language === "np") {
        return `${WEEKDAYS_NP[weekday]}, ${
            GREGORIAN_MONTHS_NP[month]
        } ${toNepaliDigits(day)}, ${toNepaliDigits(year)}`;
    }

    return `${WEEKDAYS_EN[weekday]}, ${
        GREGORIAN_MONTHS_EN[month]
    } ${day}, ${year}`;
}
