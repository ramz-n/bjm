import {
    gregorianToHijri,
    hijriToGregorian as convertHijriToGregorian,
} from "@tabby_ai/hijri-converter";

/* =========================================================
   TYPES
========================================================= */

export type Language = "en" | "np";

/* =========================================================
   NEPALI DIGITS
========================================================= */

const NEPALI_DIGITS = "०१२३४५६७८९";

export const toNepaliDigits = (
    value: string | number
): string => {
    return String(value).replace(
        /\d/g,
        (digit) => NEPALI_DIGITS[Number(digit)]
    );
};

/* =========================================================
   GREGORIAN MONTHS
========================================================= */

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

/* =========================================================
   HIJRI MONTHS
========================================================= */

const HIJRI_MONTHS_EN = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qada",
    "Dhu al-Hijjah",
];

const HIJRI_MONTHS_NP = [
    "मुहर्रम",
    "सफर",
    "रबीउल अव्वल",
    "रबीउल आखिर",
    "जमादिउल अव्वल",
    "जमादिउल आखिर",
    "रजब",
    "शाबान",
    "रमजान",
    "शव्वाल",
    "जुलकादा",
    "जुलहिज्जा",
];

/* =========================================================
   GREGORIAN DATE FORMAT
========================================================= */

/**
 * English:
 * September 5, 2026
 *
 * Nepali:
 * सेप्टेम्बर ५, २०२६
 */
export const formatGregorianDate = (
    date: Date,
    language: Language = "en"
): string => {
    const month =
        language === "np"
            ? GREGORIAN_MONTHS_NP[date.getMonth()]
            : GREGORIAN_MONTHS_EN[date.getMonth()];

    const day =
        language === "np"
            ? toNepaliDigits(date.getDate())
            : String(date.getDate());

    const year =
        language === "np"
            ? toNepaliDigits(date.getFullYear())
            : String(date.getFullYear());

    return `${month} ${day}, ${year}`;
};

/* =========================================================
   GREGORIAN → HIJRI
========================================================= */

export const gregorianToHijriDate = (
    date: Date
) => {
    return gregorianToHijri({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    });
};

/* =========================================================
   HIJRI DATE FORMATTER
========================================================= */

/**
 * Converts a Gregorian Date to a localized Hijri date.
 *
 * English:
 * Rajab 27, 1448 AH
 *
 * Nepali:
 * रजब २७, १४४८ हिजरी
 */
export const formatHijriDate = (
    date: Date,
    language: Language = "en"
): string => {
    const hijri = gregorianToHijriDate(date);

    const month =
        language === "np"
            ? HIJRI_MONTHS_NP[hijri.month - 1]
            : HIJRI_MONTHS_EN[hijri.month - 1];

    const day =
        language === "np"
            ? toNepaliDigits(hijri.day)
            : String(hijri.day);

    const year =
        language === "np"
            ? toNepaliDigits(hijri.year)
            : String(hijri.year);

    return language === "np"
        ? `${month} ${day}, ${year} हिजरी`
        : `${month} ${day}, ${year} AH`;
};

/* =========================================================
   HIJRI → GREGORIAN
========================================================= */

/**
 * Converts Hijri date to JavaScript Date.
 *
 * Example:
 *
 * hijriToGregorian(1448, 9, 1)
 */
export const hijriToGregorian = (
    hijriYear: number,
    hijriMonth: number,
    hijriDay: number,
    adjustment = 0
) => {
    const converted = convertHijriToGregorian({
        year: hijriYear,
        month: hijriMonth,
        day: hijriDay,
    });

    const gregorianDate = new Date(
        converted.year,
        converted.month - 1,
        converted.day
    );

    if (adjustment !== 0) {
        gregorianDate.setDate(
            gregorianDate.getDate() + adjustment
        );
    }

    return {
        gregorianDate,

        hijriDate: `${hijriDay} ${
            HIJRI_MONTHS_EN[hijriMonth - 1]
        } ${hijriYear}`,
    };
};

/* =========================================================
   CURRENT HIJRI YEAR
========================================================= */

export const getCurrentHijriYear = (): number => {
    const today = new Date();

    const hijri = gregorianToHijriDate(today);

    return hijri.year;
};

/* =========================================================
   FORMAT EXISTING HIJRI STRING
========================================================= */

/**
 * Converts:
 *
 * "27 Rajab 1448"
 *
 * into:
 *
 * English:
 * "27 Rajab 1448"
 *
 * Nepali:
 * "२७ रजब १४४८ हिजरी"
 */
export const formatHijriString = (
    hijriDate: string,
    language: Language = "en"
): string => {
    const parts = hijriDate.trim().split(/\s+/);

    if (parts.length < 3) {
        return hijriDate;
    }

    const day = parts[0];
    const year = parts[parts.length - 1];

    const month = parts
        .slice(1, -1)
        .join(" ");

    if (language === "en") {
        return `${day} ${month} ${year}`;
    }

    const monthIndex = HIJRI_MONTHS_EN.findIndex(
        (item) =>
            item.toLowerCase() ===
            month.toLowerCase()
    );

    const nepaliMonth =
        monthIndex >= 0
            ? HIJRI_MONTHS_NP[monthIndex]
            : month;

    return `${toNepaliDigits(day)} ${nepaliMonth} ${toNepaliDigits(year)} हिजरी`;
};