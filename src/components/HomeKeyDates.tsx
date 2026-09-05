
import { useMemo } from "react";
import {
    CalendarDays,
    ChevronRight,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { islamicEvents } from "../data/islamic-events";
import {
    getCurrentHijriYear,
    hijriToGregorian,
    formatGregorianDate,
    formatHijriString,
} from "../utils/islamic-calendar";
import { formatNepaliDate } from "../utils/nepali-date";


export default function HomeKeyDates() {
    const { language, t } = useLanguage();

    const events = useMemo(() => {
        const currentHijriYear = getCurrentHijriYear();

        const years = [
            currentHijriYear,
            currentHijriYear + 1,
        ];

        return years
            .flatMap((year) =>
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
            )
            .sort(
                (a, b) =>
                    a.gregorianDate.getTime() -
                    b.gregorianDate.getTime()
            );
    }, []);

    const today = useMemo(() => {
        const now = new Date();

        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
    }, []);

    /*
     * Find the next upcoming Islamic event.
     */
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

    /*
     * Show the next few events only.
     */
    const upcomingEvents = events
        .slice(
            nextEventIndex >= 0
                ? nextEventIndex
                : 0
        )
        .slice(0, 4);

    return (
        <section className="bg-white px-5 py-16 md:px-8 md:py-25">
            <div className="mx-auto max-w-6xl">

                {/* ----------------------------------------- */}
                {/* HEADER                                    */}
                {/* ----------------------------------------- */}

                <div className="mb-10 text-center">
                    <div className="mb-6 flex items-center justify-center gap-4">
                        <span className="h-px w-10 bg-islamic-gold" />


                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-islamic-gold">
                            {language === "np"
                                ? "इस्लामी पात्रो"
                                : "Islamic Calendar"}
                        </p>

                        <span className="h-px w-10 bg-islamic-gold" />
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-primary md:text-3xl">
                        {t.keyDates.title}
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                        {t.keyDates.subtitle}
                    </p>
                </div>


                {/* ----------------------------------------- */}
                {/* NEXT EVENT                                 */}
                {/* ----------------------------------------- */}

                {nextEvent && (
                    <div className="mb-8 overflow-hidden rounded-2xl border border-islamic-gold/20 bg-primary shadow-sm">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                            {/* Event */}
                            <div className="flex items-center gap-4 p-5 md:p-6">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-islamic-gold/10">
                                    <CalendarDays
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-islamic-gold"
                                    />
                                </div>

                                <div>
                                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-islamic-gold">
                                        {language === "np"
                                            ? "अर्को महत्वपूर्ण मिति"
                                            : "Next Event"}
                                    </p>

                                    <h3 className="text-base font-semibold text-white md:text-lg">
                                        {t.keyDates.events[nextEvent.key]}
                                    </h3>
                                </div>
                            </div>


                            {/* Date */}
                            <div className="border-t border-white/10 px-5 py-4 md:border-l md:border-t-0 md:px-7 md:py-6">

                                <p className="text-sm font-medium text-white">
                                    {formatGregorianDate(
                                        nextEvent.gregorianDate,
                                        language
                                    )}
                                </p>

                                <p className="mt-1 text-xs text-primary-dim/60">
                                    {nextEvent.nepaliDate}
                                </p>

                            </div>

                        </div>
                    </div>
                )}


                {/* ----------------------------------------- */}
                {/* UPCOMING EVENTS                            */}
                {/* ----------------------------------------- */}

                <div className="grid gap-3 md:grid-cols-2">

                    {upcomingEvents.map(
                        (event, index) => {
                            const isNext =
                                index === 0;

                            return (
                                <div
                                    key={`${event.key}-${event.hijriDate}`}
                                    className={`
                                        group flex items-center justify-between
                                        rounded-xl border p-4
                                        transition-all duration-300
                                        ${isNext
                                            ? "border-islamic-gold/20 bg-islamic-gold/[0.04]"
                                            : "border-gray-100 bg-white hover:border-islamic-gold/20 hover:bg-gray-50"
                                        }
                                    `}
                                >

                                    <div className="flex min-w-0 items-center gap-3">

                                        {/* Number */}
                                        <span
                                            className={`
                                                flex h-8 w-8 shrink-0
                                                items-center justify-center
                                                rounded-full text-xs font-semibold
                                                ${isNext
                                                    ? "bg-islamic-gold text-white"
                                                    : "bg-gray-100 text-gray-500"
                                                }
                                            `}
                                        >
                                            {index + 1}
                                        </span>


                                        <div className="min-w-0">

                                            <h4
                                                className={`
                                                    truncate text-sm font-semibold
                                                    ${isNext
                                                        ? "text-primary"
                                                        : "text-gray-700"
                                                    }
                                                `}
                                            >
                                                {t.keyDates.events[event.key]}
                                            </h4>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {formatHijriString(
                                                    event.hijriDate,
                                                    language
                                                )}
                                            </p>

                                        </div>
                                    </div>


                                    {/* Date */}
                                    <div className="ml-4 flex shrink-0 items-center gap-2">

                                        <span className="hidden text-right text-xs text-gray-400 sm:block">
                                            {formatGregorianDate(
                                                event.gregorianDate,
                                                language
                                            )}
                                        </span>

                                        <ChevronRight
                                            size={15}
                                            className={`
                                                transition-transform duration-300
                                                ${isNext
                                                    ? "text-islamic-gold"
                                                    : "text-gray-300 group-hover:translate-x-1 group-hover:text-islamic-gold"
                                                }
                                            `}
                                        />

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>


                {/* ----------------------------------------- */}
                {/* VIEW ALL                                  */}
                {/* ----------------------------------------- */}

                <div className="mt-8 text-center">

                    <a
                        href="/key-dates"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary transition-colors hover:text-islamic-gold"
                    >
                        {language === "np"
                            ? "सबै महत्वपूर्ण मितिहरू हेर्नुहोस्"
                            : "View all key dates"}

                        <ChevronRight
                            size={15}
                        />
                    </a>

                </div>

            </div>
        </section>
    );
}
