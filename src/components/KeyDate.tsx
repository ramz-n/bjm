
import { useMemo } from "react";

import {
    CalendarDays,
    ChevronRight,
    Clock3,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

import { islamicEvents } from "../data/islamic-events";

import {
    getCurrentHijriYear,
    hijriToGregorian,
} from "../utils/islamic-calendar";

import { formatNepaliDate } from "../utils/nepali-date";
import { formatGregorianDate } from "../data/prayer-schedule";

// ============================================================
// HIJRI DATE
// ============================================================

const HIJRI_MONTHS_EN = [
    "Muharram",
    "Safar",
    "Rabi al-Awwal",
    "Rabi al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhul Qi'dah",
    "Dhul Hijjah",
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

const toNepaliDigits = (value: string | number) => {
    return String(value).replace(
        /\d/g,
        (digit) => NEPALI_DIGITS[Number(digit)]
    );
};

const formatHijriDate = (
    date: string,
    language: "en" | "np"
) => {
    // Expected format from hijriToGregorian:
    // "27 Rajab 1448"

    const parts = date.split(" ");

    if (parts.length < 3) {
        return date;
    }

    const day = parts[0];
    const year = parts[parts.length - 1];

    // Everything between day and year is the month.
    const month = parts
        .slice(1, -1)
        .join(" ");

    if (language === "en") {
        return `${day} ${month} ${year}`;
    }

    const monthIndex = HIJRI_MONTHS_EN.findIndex(
        (item) =>
            item.toLowerCase() === month.toLowerCase()
    );

    const nepaliMonth =
        monthIndex >= 0
            ? HIJRI_MONTHS_NP[monthIndex]
            : month;

    return `${toNepaliDigits(day)} ${nepaliMonth} ${toNepaliDigits(year)} हिजरी`;
};


export default function KeyDate() {
    const { language, t } = useLanguage();

    /* ---------------------------------------------
       Generate current + next Hijri year
    --------------------------------------------- */

    const events = useMemo(() => {
        const currentHijriYear = getCurrentHijriYear();

        const years = [
            currentHijriYear,
            currentHijriYear + 1,
        ];

        const allEvents = years.flatMap((year) =>
            islamicEvents.map((event) => {
                const converted = hijriToGregorian(
                    year,
                    event.hijriMonth,
                    event.hijriDay,
                    event.adjustment ?? 0
                );

                return {
                    ...event,
                    hijriDate: converted.hijriDate,
                    gregorianDate:
                        converted.gregorianDate,
                    nepaliDate:
                        formatNepaliDate(
                            converted.gregorianDate
                        ),
                };
            })
        );

        return allEvents.sort(
            (a, b) =>
                a.gregorianDate.getTime() -
                b.gregorianDate.getTime()
        );
    }, []);

    /* ---------------------------------------------
       Today's date
    --------------------------------------------- */

    const today = useMemo(() => {
        const now = new Date();

        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
    }, []);

    /* ---------------------------------------------
       Find next event
    --------------------------------------------- */

    const nextEventIndex = events.findIndex(
        (event) => {
            const eventDate = new Date(
                event.gregorianDate.getFullYear(),
                event.gregorianDate.getMonth(),
                event.gregorianDate.getDate()
            );

            return eventDate >= today;
        }
    );

    const nextEvent =
        nextEventIndex >= 0
            ? events[nextEventIndex]
            : events[0];

    /* ---------------------------------------------
       Helpers
    --------------------------------------------- */

    const getEventName = (
        key: keyof typeof t.keyDates.events
    ) => {
        return t.keyDates.events[key];
    };

    const isPast = (date: Date) => {
        const eventDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );

        return eventDate < today;
    };

    return (
        <section className="relative overflow-hidden bg-white px-5 py-10 md:px-8 md:py-28">

            {/* -----------------------------------------
                Decorative background
            ----------------------------------------- */}

            <div className="pointer-events-none absolute -left-48 top-20 h-[450px] w-[450px] rounded-full bg-islamic-gold/[0.035] blur-3xl" />

            <div className="pointer-events-none absolute -right-48 bottom-20 h-[500px] w-[500px] rounded-full bg-primary/[0.025] blur-3xl" />

            <div className="relative mx-auto max-w-6xl">

                {/* -----------------------------------------
                    Section Header
                ----------------------------------------- */}

                <div className="mb-14 text-center md:mb-16">

                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-islamic-gold">
                        {t.keyDates.labels.hijri}
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-5xl">
                        {t.keyDates.title}
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
                        {t.keyDates.subtitle}
                    </p>

                </div>


                {/* -----------------------------------------
                    NEXT EVENT — HORIZONTAL CARD
                ----------------------------------------- */}

                {nextEvent && (
                    <div className="mb-16 overflow-hidden rounded-3xl border border-islamic-gold/20 bg-primary shadow-[0_15px_50px_rgba(0,0,0,0.08)]">

                        <div className="grid md:grid-cols-[1fr_auto]">

                            {/* Main event information */}

                            <div className="p-7 md:p-10">

                                <div className="mb-6 flex items-center gap-3">

                                    <span className="inline-flex h-9 items-center gap-2 rounded-full border border-islamic-gold/30 bg-islamic-gold/10 px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-islamic-gold">

                                        <Clock3 size={14} />

                                        {language === "np"
                                            ? "अर्को"
                                            : "Next Event"}

                                    </span>

                                </div>

                                <h3 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                                    {getEventName(
                                        nextEvent.key
                                    )}
                                </h3>


                                {/* Date information */}

                                <div className="mt-8 grid gap-6 sm:grid-cols-3">

                                    {/* Hijri */}

                                    <div>

                                        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dim/40">
                                            {t.keyDates.labels.hijri}
                                        </p>

                                        <p className="text-sm font-medium text-primary-dim md:text-base">
                                            {formatHijriDate(
                                                nextEvent.hijriDate,
                                                language
                                            )}
                                        </p>

                                    </div>


                                    {/* Gregorian */}

                                    <div>

                                        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dim/40">
                                            {t.keyDates.labels.gregorian}
                                        </p>

                                        <p className="text-sm font-medium text-primary-dim md:text-base">
                                            {formatGregorianDate(
                                                nextEvent.gregorianDate,
                                                language
                                            )}
                                        </p>

                                    </div>


                                    {/* Nepali */}

                                    <div>

                                        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-dim/40">
                                            {t.keyDates.labels.nepali}
                                        </p>

                                        <p className="text-sm font-medium text-primary-dim md:text-base">
                                            {nextEvent.nepaliDate}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Right date panel */}

                            <div className="flex min-w-[210px] flex-col items-center justify-center border-t border-white/10 bg-islamic-gold/[0.06] px-8 py-8 text-center md:border-l md:border-t-0 md:px-10">

                                <CalendarDays
                                    size={30}
                                    strokeWidth={1.3}
                                    className="mb-4 text-islamic-gold"
                                />

                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-dim/40">
                                    {t.keyDates.labels.gregorian}
                                </span>

                                <span className="mt-2 text-sm font-semibold text-islamic-gold">
                                    {formatGregorianDate(
                                        nextEvent.gregorianDate,
                                        language
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>
                )}


                {/* -----------------------------------------
                    ALL KEY DATES HEADER
                ----------------------------------------- */}

                <div className="mb-8 flex items-end justify-between">

                    <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-islamic-gold">
                            {language === "np"
                                ? "पात्रो"
                                : "Calendar"}
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-primary">
                            {language === "np"
                                ? "सबै महत्वपूर्ण मितिहरू"
                                : "All Key Dates"}
                        </h3>

                    </div>

                </div>


                {/* -----------------------------------------
                    VERTICAL TIMELINE
                ----------------------------------------- */}

                <div className="relative">

                    {/* Timeline line */}

                    <div className="absolute bottom-0 left-[9px] top-0 w-px bg-gray-200 md:left-[11px]" />

                    <div className="space-y-4">

                        {events.map(
                            (event, index) => {

                                const past =
                                    isPast(
                                        event.gregorianDate
                                    );

                                const isNext =
                                    index ===
                                    nextEventIndex;

                                return (
                                    <div
                                        key={`${event.key}-${event.hijriDate}`}
                                        className={`
                                            group relative pl-9
                                            md:pl-12
                                            transition-all
                                            duration-300
                                            ${past
                                                ? "opacity-45"
                                                : ""
                                            }
                                        `}
                                    >

                                        {/* Timeline dot */}

                                        <div
                                            className={`
                                                absolute left-0 top-7 z-10
                                                h-[19px] w-[19px]
                                                rounded-full border-[3px]
                                                bg-white
                                                transition-all
                                                duration-300
                                                ${isNext
                                                    ? "border-islamic-gold bg-islamic-gold shadow-[0_0_0_5px_rgba(201,162,39,0.12)]"
                                                    : "border-gray-200 group-hover:border-islamic-gold"
                                                }
                                            `}
                                        />


                                        {/* Event card */}

                                        <div
                                            className={`
                                                rounded-2xl border
                                                p-5
                                                transition-all
                                                duration-300
                                                md:p-6
                                                ${isNext
                                                    ? "border-islamic-gold/30 bg-islamic-gold/[0.045] shadow-sm"
                                                    : "border-gray-100 bg-white hover:border-islamic-gold/20 hover:shadow-sm"
                                                }
                                            `}
                                        >

                                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                                {/* Event */}

                                                <div className="min-w-0 flex-1">

                                                    <div className="mb-2 flex flex-wrap items-center gap-3">

                                                        <h4
                                                            className={`
                                                                text-base
                                                                font-semibold
                                                                md:text-lg
                                                                ${isNext
                                                                    ? "text-primary"
                                                                    : "text-gray-800"
                                                                }
                                                            `}
                                                        >
                                                            {getEventName(
                                                                event.key
                                                            )}
                                                        </h4>


                                                        {isNext && (
                                                            <span className="rounded-full bg-islamic-gold px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-white">
                                                                {language ===
                                                                    "np"
                                                                    ? "अर्को"
                                                                    : "Next"}
                                                            </span>
                                                        )}


                                                        {past && (
                                                            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                                                {language ===
                                                                    "np"
                                                                    ? "सम्पन्न"
                                                                    : "Passed"}
                                                            </span>
                                                        )}

                                                    </div>


                                                    {/* Hijri */}

                                                    <p className="text-xs text-gray-400 md:text-sm">
                                                        {formatHijriDate(
                                                            event.hijriDate,
                                                            language
                                                        )}
                                                    </p>

                                                </div>


                                                {/* Dates */}

                                                <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-gray-100 pt-4 md:min-w-[400px] md:border-l md:border-t-0 md:pl-8 md:pt-0">

                                                    {/* Gregorian */}

                                                    <div>

                                                        <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                                            {
                                                                t
                                                                    .keyDates
                                                                    .labels
                                                                    .gregorian
                                                            }
                                                        </p>

                                                        <p className="text-xs font-medium text-gray-600 md:text-sm">
                                                            {formatGregorianDate(
                                                                event.gregorianDate,
                                                                language
                                                            )}
                                                        </p>

                                                    </div>


                                                    {/* Nepali */}

                                                    <div>

                                                        <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
                                                            {
                                                                t
                                                                    .keyDates
                                                                    .labels
                                                                    .nepali
                                                            }
                                                        </p>

                                                        <p className="text-xs font-medium text-gray-600 md:text-sm">
                                                            {
                                                                event.nepaliDate
                                                            }
                                                        </p>

                                                    </div>

                                                </div>


                                                {/* Arrow */}

                                                <ChevronRight
                                                    size={17}
                                                    className={`
                                                        hidden shrink-0
                                                        transition-all
                                                        duration-300
                                                        md:block
                                                        ${isNext
                                                            ? "text-islamic-gold"
                                                            : "text-gray-200 group-hover:translate-x-1 group-hover:text-islamic-gold"
                                                        }
                                                    `}
                                                />

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}
