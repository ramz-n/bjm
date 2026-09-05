import { useMemo, useRef } from 'react';
import { getMonthSchedule, isoKeyFor, PRAYERS } from '../data/prayer-schedule';
import useNow from '../hooks/useNow';
import { hijriFormatter } from '../utils';
import NepaliDate from 'nepali-date-converter'
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

    const downloadPDF = async () => {
        const element = tableRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 1,
                useCORS: true,
                onclone: (clonedDoc) => {
                    const clonedTable = clonedDoc.querySelector("table");
                    if (!clonedTable) return;
                    const allElements = clonedTable.querySelectorAll("*");

                    allElements.forEach((el) => {
                        const element = el as HTMLElement;
                        const computedStyle = window.getComputedStyle(element);

                        if (computedStyle.backgroundColor.includes("oklab") || computedStyle.backgroundColor.includes("oklch")) {
                            if (element.closest('thead')) {
                                element.style.backgroundColor = "#0B5C45";
                            } else if (element.classList.contains('bg-accent/20')) {
                                element.style.backgroundColor = "#f0fdf4";
                            } else {
                                element.style.backgroundColor = "#ffffff";
                            }
                        }

                        if (computedStyle.color.includes("oklab") || computedStyle.color.includes("oklch")) {
                            if (element.closest('thead') || element.closest('tr')?.classList.contains('text-white')) {
                                element.style.color = "#ffffff";
                            } else {
                                element.style.color = "#1f2937";
                            }
                        }

                        if (computedStyle.borderColor.includes("oklab") || computedStyle.borderColor.includes("oklch")) {
                            element.style.borderColor = "#e5e7eb"; 
                        }
                    });
                }
            });

            const imgData = canvas.toDataURL("image/png");

            const margin = 10;
            const pageWidth = 210;
            const usableWidth = pageWidth - (margin * 2);

            const imgHeight = (canvas.height * usableWidth) / canvas.width;
            const totalPageHeight = imgHeight + (margin * 2);

            const pdf = new jsPDF("p", "mm", [pageWidth, totalPageHeight]);

            pdf.addImage(imgData, "PNG", margin, margin, usableWidth, imgHeight);

            pdf.save(`PrayerTimetable_${month.monthName}.pdf`);
        } catch (error) {
            console.error("Error generating PDF document layout:", error);
        }
    };

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
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-islamic-gold">Monthly schedule</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">{month.monthName} {month.year}</h2>
                    </div>
                    <div>
                        <button onClick={downloadPDF} className='flex gap-1 hover:text-islamic-gold cursor-pointer'>
                            <FileDown />
                            Download
                        </button>
                    </div>
                    <div>
                        <p className="font-bold text-md uppercase text-primary">{hijriFormatter(now)}</p>
                        <p className="font-bold text-xs uppercase text-primary">{nepaliMonth.format("MMMM, YYYY", "np")} BS</p>
                    </div>
                </div>

                <div className="overflow-x-scroll md:overflow-hidden rounded-2xl border border-line shadow-sm">
                    <div className="">
                        <table className="w-full border-collapse text-left" ref={tableRef}>
                            <thead className="sticky top-0 z-10 bg-primary-dim">
                                <tr className='border-b bg-secondary-green print:bg-[#0B5C45] text-white'>
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
                                                        : "bg-white"
                                            }
                                        >
                                            <td className="relative whitespace-nowrap px-4 py-3 font-body text-sm">
                                                <span className="flex items-center gap-2">
                                                    {isToday && (
                                                        <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-islamic-gold" />
                                                    )}
                                                    <span className={isToday ? "font-semibold text-primary" : "text-secondary-green"}>
                                                        {day.dayNum} {day.weekday}
                                                    </span>
                                                    {isToday && (
                                                        <span className="rounded-full bg-islamic-gold px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-white">
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
                                                    {hijriFormatter(day.date, "en", "dayMonth" )}
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