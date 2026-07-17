import { findNextPrayer, formatCountdown, formatFullDate, PRAYERS } from "../data/prayer-schedule";
import type { DaySchedule } from "../types";

interface HeroProps {
    now: Date;
    todayEntry: DaySchedule;
    tomorrowEntry?: DaySchedule;
}

const Hero = ({ now, todayEntry, tomorrowEntry }: HeroProps) => {

    const next = findNextPrayer(now, todayEntry, tomorrowEntry);
    const timeLabel = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

    return (
        <section className="py-20 min-h-100 px-3">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 items-center">
                <div className="grid items-center justify-center gap-5">
                    <p className="font-semibold text-xs uppercase tracking-[0.2em]">
                        {formatFullDate(now)}
                    </p>
                    <h1 className="text-4xl font-bold">A place of worship, at the heart of the community</h1>
                    <p>Welcome to Al Jamiatul Barkatiya Jame Masjid, a place for worship, learning, service and community.</p>

                    <div className="mt-8 inline-flex w-fit items-center gap-4 rounded-2xl border border-line bg-accent px-5 py-4 shadow-sm">
                        <div className="font-mono text-2xl font-semibold text-secondary">{timeLabel}</div>
                        <div className="h-8 w-px bg-line" />
                        {next && (
                            <div>
                                <p className="font-body text-xs text-secondary">
                                    {next.isTomorrow ? "Next tomorrow" : "Up next"}
                                </p>
                                <p className="font-body text-sm font-semibold text-primary-dim">
                                    {next.label} · {next.time}
                                    <span className="ml-2 rounded-full bg-primary-dim px-2 py-0.5 text-xs font-bold text-primary">
                                        in {formatCountdown(next.minutesUntil)}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-line bg-accent text-secondary p-6 shadow-xl w-100">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                        <h2 className="text-lg font-semibold text-secondary">Today's prayer times</h2>
                    </div>
                    <ul className="mt-3 divide-y divide-line">
                        {PRAYERS.map((prayer) => {
                            const t = todayEntry.times[prayer.key];
                            const isNext = Boolean(next && !next.isTomorrow && next.label === prayer.label);
                            return (
                                <li
                                    key={prayer.key}
                                    className={`flex items-center justify-between py-2.5 ${isNext ? "-mx-3 rounded-lg bg-secondary-dim px-3" : ""
                                        }`}
                                >
                                    <span className={`text-sm ${isNext ? "font-extrabold text-secondary" : "text-secondary/80"}`}>
                                        {prayer.label}
                                    </span>
                                    <span className={`text-sm ${isNext ? "font-extrabold text-secondary" : "text-secondary/80"}`}>
                                        {t.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Hero