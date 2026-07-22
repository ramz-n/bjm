import { Calendar } from "lucide-react"
import { dates } from "../data/allkeydates"


const KeyDates = () => {
    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/keydates-bg.webp"
                    alt="Key Dates"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            Key Dates
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center border-b pb-3">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Key Dates</p>
                        <span className="mt-2 font-display text-3xl font-semibold">2026 AD · </span>
                        <span className="mt-2 font-display text-3xl font-semibold">2083 BS · </span>
                        <span className="mt-2 font-display text-3xl font-semibold">1447 - 1448 AH</span>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl">
                    <ul className="">
                        {dates.map((date, idx) =>
                            <li key={idx} className="flex items-center md:gap-3 gap-1 mb-3">
                                <Calendar size={50} className="" />
                                <span className="text-sm md:text-xl md:font-bold bg-accent/90 rounded-lg px-3 text-primary-dim">{date.event}</span> |
                                <span className="text-sm">{date.gregorianDate}</span> |
                                <span className="text-sm">{date.nepaliDate}</span> |
                                <span className="text-sm">{date.hijriDate}</span>
                            </li>)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default KeyDates