import { Calendar } from "lucide-react"
import { dates } from "../data/allkeydates"

const KeyDate = () => {
    return (
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
    )
}

export default KeyDate;