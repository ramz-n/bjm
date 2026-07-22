import { useMemo, useRef } from 'react';
import { getMonthSchedule, isoKeyFor, PRAYERS } from '../data/prayer-schedule';
import useNow from '../hooks/useNow';
import { hijriFormatter } from '../utils';
import NepaliDate from 'nepali-date-converter'

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

    const nepaliMonth = new NepaliDate(now)

    const todayRowRef = useRef<HTMLTableRowElement | null>(null);
    const tableRef = useRef(null);

    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/timetable-bg.webp"
                    alt="Timetable"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                    {/* Optional dark overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            Timetable
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Monthly schedule</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">{month.monthName} {month.year}</h2>
                    </div>
                    <div>
                        <p className="font-bold text-md uppercase text-primary">{hijriFormatter("").format()}</p>
                        <p className="font-bold text-xs uppercase text-primary">{nepaliMonth.format("MMMM, YYYY", "np")} BS</p>
                    </div>
                </div>

                <div className="overflow-x-scroll md:overflow-hidden rounded-2xl border border-line shadow-sm">
                    <div className="">
                        <table className="w-full border-collapse text-left" ref={tableRef}>
                            <thead className="sticky top-0 z-10 bg-primary-dim">
                                <tr className='border-b bg-secondary-green text-primary-dim'>
                                    <th scope="col" className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide">
                                        Date
                                    </th>

                                    <th scope="col" className="whitespace-nowrap px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide">
                                        Nepali
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

                                            <td className="relative whitespace-nowrap px-4 py-3 font-body text-sm">
                                                <span className={isToday ? "font-semibold text-primary" : "text-secondary-green"}>
                                                    {new NepaliDate(day.date).format("MMMM D", "np").toString()}
                                                </span>
                                            </td>


                                            <td className="relative whitespace-nowrap px-4 py-3 font-body text-sm">
                                                <span className={isToday ? "font-semibold text-primary" : "text-secondary-green"}>
                                                    {hijriFormatter("dayMonth").format(day.date)}
                                                </span>
                                            </td>

                                            {PRAYERS.map((prayer) => (
                                                <td
                                                    key={prayer.key}
                                                    className={`whitespace-nowrap px-4 py-3 font-mono text-sm ${isToday ? "font-semibold text-primary" : "text-primary/90"
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
            </div>
        </section>
    )
}

export default PrayerTimes