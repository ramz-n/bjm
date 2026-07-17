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
        <div className="bg-primary py-12 min-h-100 text-primary-dim px-3">
            <div className="container mx-auto flex flex-col items-start justify-center gap-8">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("/hero-bg.jpg")` }}
                >
                    <div className="absolute inset-0 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 py-16">
                    <div className="max-w-3xl bg-primary/80 p-8">
                        <p className="mb-2">
                            PRAGATIPATH-2 . NARAYANGARH . CHITWAN
                            </p>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-secondary-foreground mb-6 leading-tight">
                            A place of worship, at the heart of the community
                        </h1>
                        <p className="text-xl text-secondary-foreground mb-12 font-body">
                            Welcome to Al Jamiatul Barkatiya Jame Masjid, a place for worship, learning, service and community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero