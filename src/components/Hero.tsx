import {
    findNextPrayer,
    formatCountdown,
    PRAYERS,
    formatPrayerTime,
    formatCurrentTime,
    formatPrayerName,
    formatGregorianDate,
} from "../data/prayer-schedule";
import type { DaySchedule } from "../types";
import NepaliDate from 'nepali-date-converter'
import { hijriFormatter, requestNotificationPermission } from "../utils";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
    now: Date;
    todayEntry: DaySchedule;
    tomorrowEntry?: DaySchedule;
}


const showNotification = (title: string, body: string) => {
    new Notification(title, {
        body,
        icon: "./logo.png",
    });
};



const Hero = ({ now, todayEntry, tomorrowEntry }: HeroProps) => {


    const { language, t } = useLanguage();

    const next = findNextPrayer(now, todayEntry, tomorrowEntry);
    const timeLabel = formatCurrentTime(now, language);

    const nepaliDateLabel = new NepaliDate(now);

    useEffect(() => { const notify = async () => { const granted = await requestNotificationPermission(t.notifications.unsupported); if (!granted || !next) return; if (next.minutesUntil === 5 || next.minutesUntil === 0) { const prayerName = language === "np" ? t.prayer[next.key as keyof typeof t.prayer] : next.label; const countdown = formatCountdown(next.minutesUntil, language); if (next.minutesUntil === 0) { showNotification(language === "np" ? "नमाज सूचना ⏰" : "Namaz Alert ⏰", language === "np" ? `${prayerName} को समय सुरु भएको छ!` : `${prayerName} time has started!`); } else { showNotification(language === "np" ? "नमाज सूचना ⏰" : "Namaz Alert ⏰", language === "np" ? `${prayerName} को समय ${countdown} मा सुरु हुनेछ।` : `${prayerName} time in ${countdown}!`); } } }; notify(); }, [next?.minutesUntil, language, t]);

    return (
        <section className="relative min-h-screen text-primary-dim pt-15 md:pt-0 px-3 overflow-hidden">
            <div className="min-h-[calc(100dvh-7.5rem)] flex flex-col items-start justify-center gap-7 md:h-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/home-bg.webp")` }}
                >
                    {/* Bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                    {/* Warm subtle glow */}
                    <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-islamic-gold/10 blur-[120px]" />

                </div>

                {/* Hero Content */}

                <div className="container mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px] gap-5 items-center justify-between">
                    <div className="flex flex-col justify-center z-10 gap-3 md:gap-5">
                        <div className="md:max-w-2xl flex flex-col items-start gap-3 md:gap-5 justify-center bg-accent/90 border-accent-dim py-7 px-5 md:p-8 rounded-2xl">
                            {/* Location */}
                            <div className="flex items-center gap-3">

                                <span className="h-px w-12 bg-islamic-gold" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/75 md:text-sm">
                                    {t.hero.location}
                                </p>

                            </div>
                            {/* Heading */}
                            <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">

                                {t.hero.title.titleFront}

                                <span className="text-soft-yellow">
                                    {t.hero.title.titleMiddle}
                                </span>

                                <br />

                                {t.hero.title.titleEnd}

                            </h1>
                            {/* Description */}
                            <p className="max-w-xl tracking-wide text-sm leading-normal md:leading-7 text-primary-dim/95 sm:text-base md:text-lg md:leading-8">
                                {t.hero.description}
                            </p>


                            {/* Gold divider 
                            <div className="h-px w-24 bg-islamic-gold/70" />*/}
                        </div>

                        {/* =================================================
                            TIME + NEXT PRAYER
                        ================================================== */}
                        <div className="mt-3 flex flex-row gap-3">

                            {/* Current time */}
                            <div className="flex min-w-auto items-center gap-4 rounded-xl border border-accent-gray/15 bg-accent/25 px-4 py-3 backdrop-blur-md">

                                <div>
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                                        {t.hero.localTime}
                                    </p>

                                    <p className="pt-1 font-mono text-sm md:text-xl font-bold text-white">
                                        {timeLabel}
                                    </p>
                                </div>

                            </div>


                            {/* Next prayer */}
                            {next && (
                                <div className="flex min-w-auto items-center gap-4 rounded-xl border border-accent-gray/30 bg-accent/25 px-4 py-3 backdrop-blur-md">

                                    <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-soft-yellow">
                                            {next.isTomorrow
                                                ? t.hero.tomorrow
                                                : t.hero.nextPrayer}
                                        </p>

                                        <p className="pt-1 font-mono text-sm md:text-xl font-bold text-white">
                                            {/* Translated prayer name */}
                                            {t.prayer[next.key as keyof typeof t.prayer]}
                                            <span className="md:mx-2 text-white/30"> · </span>
                                            {/* Translated prayer time */}
                                            {formatPrayerTime(next.minutes, language)}
                                        </p>
                                    </div>

                                    <span className="rounded-full  bg-soft-yellow px-4 py-2 text-[11px] md:text-[12px] whitespace-nowrap font-bold text-primary">
                                        {formatCountdown(next.minutesUntil, language)}
                                    </span>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* =================================================
                        PRAYER CARD
                    ================================================== */}

                    <div className="w-full md:-mt-15 lg:max-w-[400px]">

                        <div className="overflow-hidden scroll-pt-2 rounded-3xl bg-accent-gray shadow-[0_25px_80px_rgba(0,0,0,0.35)]">


                            {/* Card header */}
                            <div className="px-6 pb-5 pt-6">

                                <div className="flex items-start justify-between">

                                    <div>

                                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-islamic-gold">
                                            {t.hero.dailySchedule}
                                        </p>

                                        <h2 className="mt-1 text-2xl font-extrabold text-[#063D2E]">
                                            {t.hero.prayerTimes}
                                        </h2>

                                    </div>

                                </div>


                                {/* Dates */}
                                <div className="mt-3 grid grid-cols-3 divide-x divide-[#063D2E]/10 rounded-xl bg-[#063D2E]/5 py-3">

                                    <div className="px-2 text-center">

                                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#3F6459]/60">
                                            {t.hero.gregorian}
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-primary">
                                            {formatGregorianDate(now, language)}
                                        </p>

                                    </div>


                                    <div className="px-2 text-center">

                                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#3F6459]/60">
                                            {t.hero.nepali}
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-primary">
                                            {nepaliDateLabel.format(
                                                "ddd DD, MMMM YYYY",
                                                "np"
                                            )}
                                        </p>

                                    </div>


                                    <div className="px-2 text-center">

                                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#3F6459]/60">
                                            {t.hero.hijri}
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-primary">
                                            {hijriFormatter(now, language)}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* Prayer list */}
                            <ul className="px-4 pb-4">

                                {PRAYERS.map((prayer) => {

                                    const t =
                                        todayEntry.times[prayer.key];

                                    const isNext = Boolean(
                                        next &&
                                        !next.isTomorrow &&
                                        next.key === prayer.key
                                    );

                                    return (
                                        <li
                                            key={prayer.key}
                                            className={`
                                                relative
                                                flex
                                                items-center
                                                justify-between
                                                rounded-xl
                                                px-4
                                                py-3
                                                ${isNext
                                                    ? "bg-primary"
                                                    : "hover:bg-[#063D2E]/5"
                                                }
                                            `}
                                        >

                                            <div className="flex items-center gap-3">

                                                <span
                                                    className={`
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        ${isNext
                                                            ? "bg-soft-yellow"
                                                            : "bg-[#3F6459]/30"
                                                        }
                                                    `}
                                                />

                                                <span
                                                    className={`
                                                        text-sm
                                                        ${isNext
                                                            ? "font-bold text-white"
                                                            : "font-medium text-primary"
                                                        }
                                                    `}
                                                >
                                                    {formatPrayerName(prayer.key, language)}
                                                </span>

                                            </div>


                                            <span
                                                className={`
                                                    font-mono
                                                    text-sm
                                                    ${isNext
                                                        ? "font-bold text-soft-yellow"
                                                        : "font-medium text-primary"
                                                    }
                                                `}
                                            >
                                                {formatPrayerTime(t.minutes, language)}
                                            </span>

                                        </li>
                                    );
                                })}

                            </ul>



                        </div>

                    </div>
                </div>

            </div>
            {/* =====================================================
                SCROLL INDICATOR
            ====================================================== */}
            <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">

                <span className="text-[9px] uppercase tracking-[0.3em] text-soft-yellow/50">
                    Explore
                </span>

                <div className="h-8 w-px bg-gradient-to-b from-islamic-gold to-transparent" />

            </div>
        </section>
    )
}

export default Hero