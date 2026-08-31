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
import { useEffect, useRef } from "react";
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

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const next = findNextPrayer(now, todayEntry, tomorrowEntry);
    const timeLabel = formatCurrentTime(now, language);

    const nepaliDateLabel = new NepaliDate(now);


    useEffect(() => { const notify = async () => { const granted = await requestNotificationPermission(t.notifications.unsupported); if (!granted || !next) return; if (next.minutesUntil === 5 || next.minutesUntil === 0) { const prayerName = language === "np" ? t.prayer[next.key as keyof typeof t.prayer] : next.label; const countdown = formatCountdown(next.minutesUntil, language); if (next.minutesUntil === 0) { showNotification(language === "np" ? "नमाज सूचना ⏰" : "Namaz Alert ⏰", language === "np" ? `${prayerName} को समय सुरु भएको छ!` : `${prayerName} time has started!`); } else { showNotification(language === "np" ? "नमाज सूचना ⏰" : "Namaz Alert ⏰", language === "np" ? `${prayerName} को समय ${countdown} मा सुरु हुनेछ।` : `${prayerName} time in ${countdown}!`); } } }; notify(); }, [next?.minutesUntil, language, t]);

    return (
        <section className="relative min-h-screen text-primary-dim px-3">
            <div className="h-screen flex flex-col items-start justify-center gap-8">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/home-bg.webp")` }}
                >
                    <div className="absolute inset-0 to-transparent"></div>
                </div>

                {/* Hero Content */}

                <div className="container mt-10 mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px] gap-5 items-center justify-between">
                    <div className="flex flex-col justify-center z-10 gap-3 md:gap-5">
                        <div className="md:max-w-3xl flex flex-col items-start gap-2 md:gap-5 justify-center bg-accent/90 p-5 backdrop-blur-xs md:p-8 rounded-2xl">
                            {/* Location */}
                            <div className="flex items-center gap-3">

                                <span className="h-px w-12 bg-islamic-gold" />

                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75 md:text-sm">
                                    {t.hero.location}
                                </p>

                            </div>
                            {/* Heading */}
                            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">

                                {t.hero.title.titleFront}

                                <span className="text-soft-yellow">
                                    {t.hero.title.titleMiddle}
                                </span>

                                <br />

                                {t.hero.title.titleEnd}

                            </h1>
                            {/* Description */}
                            <p className="max-w-xl text-sm leading-7 text-soft-yellow/95 sm:text-base md:text-lg md:leading-8">
                                {t.hero.description}
                            </p>


                            {/* Gold divider */}
                            <div className="h-px w-24 bg-islamic-gold/70" />
                        </div>

                        {/* =================================================
                            TIME + NEXT PRAYER
                        ================================================== */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            {/* Current time */}
                            <div className="flex items-center gap-4 rounded-xl border border-white/15 bg-accent/25 px-5 py-3 backdrop-blur-md">

                                <div>
                                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                                        {t.hero.localTime}
                                    </p>

                                    <p className="mt-1 font-mono text-xl font-bold text-white">
                                        {timeLabel}
                                    </p>
                                </div>

                            </div>


                            {/* Next prayer */}
                            {next && (
                                <div className="flex items-center gap-4 rounded-xl border border-islamic-gold/30 bg-accent/70 px-5 py-3 backdrop-blur-md">

                                    <div>
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-islamic-gold">
                                            {next.isTomorrow
                                                ? t.hero.tomorrow
                                                : t.hero.nextPrayer}
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-white"> {/* Translated prayer name */} {t.prayer[next.key as keyof typeof t.prayer]} <span className="mx-2 text-white/30"> · </span> {/* Translated prayer time */} {formatPrayerTime(next.minutes, language)} </p>
                                    </div>

                                    <span className="rounded-full bg-islamic-gold px-3 py-2 text-[12px] font-bold text-primary">
                                        {formatCountdown(next.minutesUntil, language)}
                                    </span>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* =================================================
                        PRAYER CARD
                    ================================================== */}

                    <div className="w-full lg:max-w-[400px]">

                        <div className="overflow-hidden scroll-pt-2 rounded-3xl bg-[#F5F1E7] shadow-[0_25px_80px_rgba(0,0,0,0.35)]">


                            {/* Card header */}
                            <div className="px-6 pb-5 pt-6">

                                <div className="flex items-start justify-between">

                                    <div>

                                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A227]">
                                            {t.hero.dailySchedule}
                                        </p>

                                        <h2 className="mt-1 text-2xl font-extrabold text-[#063D2E]">
                                            {t.hero.prayerTimes}
                                        </h2>

                                    </div>

                                </div>


                                {/* Dates */}
                                <div className="mt-5 grid grid-cols-3 divide-x divide-[#063D2E]/10 rounded-xl bg-[#063D2E]/5 py-3">

                                    <div className="px-2 text-center">

                                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#3F6459]/60">
                                            {t.hero.gregorian}
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-[#063D2E]">
                                            {formatGregorianDate(now, language)}
                                        </p>

                                    </div>


                                    <div className="px-2 text-center">

                                        <p className="text-[8px] font-bold uppercase tracking-wider text-[#3F6459]/60">
                                            {t.hero.nepali}
                                        </p>

                                        <p className="mt-1 text-[10px] font-medium text-[#063D2E]">
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

                                        <p className="mt-1 text-[10px] font-medium text-[#063D2E]">
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
                                                    ? "bg-[#063D2E]"
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
                                                            ? "bg-[#F1D36A]"
                                                            : "bg-[#3F6459]/30"
                                                        }
                                                    `}
                                                />

                                                <span
                                                    className={`
                                                        text-sm
                                                        ${isNext
                                                            ? "font-bold text-white"
                                                            : "font-medium text-[#3F6459]"
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
                                                        ? "font-bold text-[#F1D36A]"
                                                        : "font-medium text-[#063D2E]"
                                                    }
                                                `}
                                            >
                                                {formatPrayerTime(t.minutes, language)}
                                            </span>

                                        </li>
                                    );
                                })}

                            </ul>


                            {/* Card footer */}
                            <div className="border-t border-[#063D2E]/10 py-2" />


                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero