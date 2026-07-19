import { useMemo, useRef } from 'react';
import { getMonthSchedule, isoKeyFor, PRAYERS } from '../data/prayer-schedule';
import useNow from '../hooks/useNow';

const PrayerTimes = () => {

    const now = useNow();

    const month = useMemo(
        () => getMonthSchedule(now),
        [now.getFullYear(), now.getMonth()],
    );
    const todayIsoKey = useMemo(
        () => isoKeyFor(now),
        [now.getFullYear(), now.getMonth(), now.getDate()],
    );

    const todayRowRef = useRef<HTMLTableRowElement | null>(null);
    const tableRef = useRef(null);

    return (
        <section id="schedule" className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-5 flex justify-between gap-4 items-center">
                <div>
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Monthly schedule</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold">{month.monthName} {month.year}</h2>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
                <div className="">
                    <table className="w-full border-collapse text-left" ref={tableRef}>
                        <thead className="sticky top-0 z-10 bg-primary-dim">
                            <tr className='border-b bg-secondary-green text-primary-dim'>
                                <th scope="col" className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide">
                                    Date
                                </th>

                                <th scope="col" className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide">
                                    Hijri
                                </th>

                                {PRAYERS.map((prayer) => (
                                    <th
                                        key={prayer.key}
                                        scope="col"
                                        className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide"
                                    >
                                        {prayer.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {month.days.map((day) => {
                                const isToday = day.isoKey === todayIsoKey;
                                return (
                                    <tr
                                        key={day.isoKey}
                                        ref={isToday ? todayRowRef : null}
                                        className={
                                            isToday
                                                ? "relative border-2"
                                                : day.isFriday
                                                    ? "bg-accent/20"
                                                    : "bg-accent-dim"
                                        }
                                    >
                                        <td className="relative whitespace-nowrap px-4 py-3 font-body text-sm">
                                            <span className="flex items-center gap-2">
                                                {isToday && (
                                                    <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-accent" />
                                                )}
                                                <span className={isToday ? "font-semibold text-primary" : "text-secondary-green"}>
                                                    {day.dayNum} {day.weekday}
                                                </span>
                                                {isToday && (
                                                    <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary-dim">
                                                        Today
                                                    </span>
                                                )}
                                            </span>
                                        </td>

                                        {PRAYERS.map((prayer) => (
                                            <td
                                                key={prayer.key}
                                                className={`tabular whitespace-nowrap px-4 py-3 font-mono text-sm ${isToday ? "font-semibold text-verdigris" : "text-ink-soft"
                                                    }`}
                                            >
                                                {day.times[prayer.key].label}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default PrayerTimes