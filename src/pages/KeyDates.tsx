import KeyDate from "../components/KeyDate";
import { useLanguage } from "../context/LanguageContext";

const KeyDates = () => {
    const { t } = useLanguage();
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
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            {t.keyDates.title}
                        </h1>
                    </div>
                </div>
            </div>
            <KeyDate />
        </section>
    )
}

export default KeyDates