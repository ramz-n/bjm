
import { gregorianToHijri } from "@tabby_ai/hijri-converter";

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

const NEPALI_DIGITS = "०१२३४५६७८९";

const toNepaliDigits = (value: string | number): string => {
    return String(value).replace(
        /\d/g,
        (digit) => NEPALI_DIGITS[Number(digit)]
    );
};

export const hijriFormatter = (
    date: Date,
    language: "en" | "np" = "en",
    formatType: "all" | "dayMonth" | "monthYear" = "all"
): string => {
    try {
        const hijri = gregorianToHijri({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        });

        const months =
            language === "np"
                ? HIJRI_MONTHS_NP
                : HIJRI_MONTHS_EN;

        const month = months[hijri.month - 1];

        const day =
            language === "np"
                ? toNepaliDigits(
                      String(hijri.day).padStart(2, "0")
                  )
                : String(hijri.day).padStart(2, "0");

        const year =
            language === "np"
                ? toNepaliDigits(hijri.year)
                : String(hijri.year);

        if (formatType === "all") {
            return language === "np"
                ? `${month} ${day}, ${year} हिजरी`
                : `${month} ${day}, ${year} AH`;
        }

        if (formatType === "dayMonth") {
            return `${month} ${day}`;
        }

        return language === "np"
            ? `${month} ${year} हिजरी`
            : `${month} ${year} AH`;

    } catch (error) {
        console.error("Hijri date conversion failed:", error);

        // Locale-based fallback
        return new Intl.DateTimeFormat(
            language === "np"
                ? "ne-NP-u-ca-islamic"
                : "en-US-u-ca-islamic",
            {
                day: formatType !== "monthYear"
                    ? "2-digit"
                    : undefined,
                month: "long",
                year: formatType !== "dayMonth"
                    ? "numeric"
                    : undefined,
            }
        ).format(date);
    }
};


export const requestNotificationPermission = async (
    unsupportedMessage: string
): Promise<boolean> => {
    if (!("Notification" in window)) {
        alert(unsupportedMessage);
        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }

    return false;
};
