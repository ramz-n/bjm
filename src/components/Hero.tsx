import { findNextPrayer, formatCountdown, PRAYERS } from "../data/prayer-schedule";
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
        <section className="relative min-h-screen text-primary-dim px-3">
            <div className="h-screen flex flex-col items-start justify-center gap-8">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/hero-bg.jpg")` }}
                >
                    <div className="absolute inset-0 to-transparent"></div>
                </div>

                <div className="container mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] gap-5 items-center justify-between">
                    <div className="flex flex-col justify-center z-10">
                        <div className="max-w-3xl flex flex-col items-start gap-5 justify-center bg-accent/90 p-8 rounded-2xl">
                            <p className="text-white">
                                PRAGATIPATH-2 . NARAYANGARH . CHITWAN
                            </p>
                            <h1 className="text-2xl md:text-5xl font-heading font-bold text-accent-dim">
                                A place of worship, at the heart of the community
                            </h1>
                            <p className="text-xl text-white font-body">
                                Welcome to Al Jamiatul Barkatiya Jame Masjid, a place for worship, learning, service and community.
                            </p>
                        </div>

                        <div className="mt-8 inline-flex w-fit items-center gap-4 rounded-2xl border border-line bg-accent/90 px-5 py-4 shadow-sm">
                            <div className="font-mono text-2xl font-semibold text-ink">{timeLabel}</div>
                            <div className="h-8 w-px bg-accent" />
                            {next && (
                                <div>
                                    <p className="font-body text-xs text-secondary/80">
                                        {next.isTomorrow ? "Next tomorrow" : "Up next"}
                                    </p>
                                    <p className="font-body text-sm font-semibold text-white">
                                        {next.label} · {next.time}
                                        <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-primary">
                                            in {formatCountdown(next.minutesUntil)}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-line bg-accent/90 p-6 shadow-sm z-10 w-[300px]">
                        <div className="flex items-center justify-between border-b border-line pb-3">
                            <h2 className="font-display text-lg font-semibold text-ink">Today's prayer times</h2>
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
                                        <span className={`font-body text-sm ${isNext ? "font-extrabold text-secondary/90" : "text-primary-dim"}`}>
                                            {prayer.label}
                                        </span>
                                        <span className={`font-mono text-sm ${isNext ? "font-extrabold text-secondary/90" : "text-primary-dim"}`}>
                                            {t.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero