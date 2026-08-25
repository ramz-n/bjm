import { gregorianToHijri } from '@tabby_ai/hijri-converter'

const HIJRI_MONTHS = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qada", "Dhu al-Hijjah"
];

export const hijriFormatter = (date: Date, formattype: string): string => {
    try {
        const hijri = gregorianToHijri({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });

        const dayStr = String(hijri.day).padStart(2, '0');
        const monthStr = HIJRI_MONTHS[hijri.month - 1];
        const yearStr = String(hijri.year);

        if (formattype === "all") {
            return `${monthStr} ${dayStr}, ${yearStr}`;
        }
        if (formattype === "dayMonth") {
            return `${monthStr} ${dayStr}`;
        }
        return `${monthStr} ${yearStr}`;
    } catch (error) {
        return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: formattype !== 'monthYear' ? '2-digit' : undefined,
            month: 'long',
            year: formattype !== 'dayMonth' ? 'numeric' : undefined
        }).format(date);
    }
}

export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return false;
    }
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }
    return false;
};