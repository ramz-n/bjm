import { Calendar } from "lucide-react"

const dates = [
    {
        "event": "Al-Isra wal-Mi'raj",
        "hijriDate": "27 Rajab",
        "gregorianDate": "16th January",
        "nepaliDate": "2nd Magh"
    },
    {
        "event": "Ramadan begins",
        "hijriDate": "01 Ramadan",
        "gregorianDate": "18th February",
        "nepaliDate": "6th Phalgun"
    },
    {
        "event": "Eid-ul-Fitr",
        "hijriDate": "01 Shawwal",
        "gregorianDate": "20th March",
        "nepaliDate": "6th Chaitra"
    },
    {
        "event": "Hajj begins",
        "hijriDate": "08 Dhul Hijjah",
        "gregorianDate": "25th May",
        "nepaliDate": "11th Jestha"
    },
    {
        "event": "Day of Arafat",
        "hijriDate": "09 Dhul Hijjah",
        "gregorianDate": "26th May",
        "nepaliDate": "12th Jestha"
    },
    {
        "event": "Eid al Adha",
        "hijriDate": "10 Dhul Hijjah",
        "gregorianDate": "27th May",
        "nepaliDate": "13th Jestha"
    },
    {
        "event": "Islamic New Year",
        "hijriDate": "30 Dhul Hijjah",
        "gregorianDate": "16th June",
        "nepaliDate": "2nd Ashadh"
    },
    {
        "event": "Day of Ashura",
        "hijriDate": "09 Muharram 1448",
        "gregorianDate": "25th June",
        "nepaliDate": "11th Ashadh"
    }
]

const KeyDates = () => {
    return (
        <section id="schedule" className="mx-auto max-w-6xl px-6 pt-24 pb-10">
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
                    {dates.map(date =>
                        <li className="flex items-center md:gap-3 gap-1 mb-3">
                            <Calendar size={50} className="" />
                            <span className="text-sm md:text-xl md:font-bold bg-accent/90 rounded-lg px-3 text-primary-dim">{date.event}</span> |
                            <span className="text-sm">{date.gregorianDate}</span> |
                            <span className="text-sm">{date.nepaliDate}</span> |
                            <span className="text-sm">{date.hijriDate}</span>
                        </li>)}
                </ul>
            </div>
        </section>
    )
}

export default KeyDates