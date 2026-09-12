import { MapPin, Navigation } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const MasjidMap = () => {
    const { t } = useLanguage();
    return (
        <section className="relative w-full overflow-hidden bg-primary">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-islamic-gold/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-white/[0.025] blur-3xl" />

            <div className="relative w-full">
                {/* Section Header */}
                <div className="mx-auto mt-13 pb-9 max-w-3xl px-5 text-center md:mb-10 md:px-8">
                    <div className="mb-6 flex items-center justify-center gap-4">
                        <span className="h-px w-10 bg-islamic-gold" />


                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-islamic-gold">
                            {t.location.visitUs}
                        </p>

                        <span className="h-px w-10 bg-islamic-gold" />
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                        {t.location.title}
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                        {t.location.description}
                    </p>
                </div>

                {/* Full-width Map */}
                <div className="relative w-full">
                    <div className="w-full overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.569875118396!2d84.42493427405277!3d27.699685925831897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fbcd3f47cbed%3A0x5c4cb26456a049cb!2sAl-jame%20Atul%20Barkatiya%20Barkati%20Jame%20Masid!5e0!3m2!1sen!2snp!4v1787651106779!5m2!1sen!2snp"
                            className="block h-[320px] w-full sm:h-[380px] md:h-[300px] lg:h-[380px]"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="Al-Jamaetul Barkatiya Jame Masjid location"
                        />
                    </div>

                    {/* Location Card */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 md:bottom-8 md:left-8 md:right-auto">
                        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl sm:p-5 md:flex-row md:items-center">

                            {/* Icon + Address */}
                            <div className="flex min-w-0 items-center gap-3">

                                {/* Icon */}
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-islamic-gold/10">
                                    <MapPin
                                        size={21}
                                        strokeWidth={1.7}
                                        className="text-islamic-gold"
                                    />
                                </div>

                                {/* Address */}
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-islamic-gold">
                                        {t.location.ourLocation}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold leading-tight text-primary">
                                        {t.location.address}
                                    </p>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {t.location.country}
                                    </p>
                                </div>

                            </div>

                            {/* Directions */}
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Al-jame+Atul+Barkatiya+Barkati+Jame+Masid"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex
                                    w-full
                                    shrink-0
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-islamic-gold
                                    px-5
                                    py-3
                                    text-xs
                                    font-bold
                                    text-primary
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-[#d7b12d]
                                    hover:shadow-lg
                                    md:w-auto
                                "
                            >
                                <Navigation
                                    size={15}
                                    strokeWidth={2}
                                />
                                {t.location.getDirections}
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MasjidMap;