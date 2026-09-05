import { CalendarHeart, HandHelping, Handshake, type LucideIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Features {
    icon: LucideIcon,
    title: string;
    body: string;
}


const About = () => {
    const { t } = useLanguage();
    const features: Features[] = [
        {
            icon: Handshake,
            title: t.about.communityOwned.title,
            body: t.about.communityOwned.description,
        },
        {
            icon: CalendarHeart,
            title: t.about.events.title,
            body: t.about.events.description,
        },
        {
            icon: HandHelping,
            title: t.about.charity.title,
            body: t.about.charity.description,
        },
    ];
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-25">
            {/* Decorative background element */}
            <div
                className="
                    pointer-events-none
                    absolute -right-40 top-20
                    h-96 w-96
                    rounded-full
                    bg-islamic-gold/5
                    blur-3xl
                    overflow-hidden
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute -left-40 bottom-0
                    h-96 w-96
                    rounded-full
                    bg-secondary-green/5
                    blur-3xl
                "
            />

            <div className="container relative mx-auto px-5">
                {/* =========================================
                    ABOUT INTRO
                ========================================== */}
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* TEXT */}
                    <div className="order-2 lg:order-1">

                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">{t.about.eyebrow}</p>
                        </div>

                        {/* Heading */}
                        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            {t.about.title.start}
                            <span className="text-secondary-green">{t.about.title.end}</span>
                        </h2>

                        {/* Description */}
                        <p className="mt-7 max-w-xl text-sm leading-7 text-accent md:text-base md:leading-8">
                            {t.about.paragraph1}
                        </p>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-accent md:text-base md:leading-8">
                            {t.about.paragraph2}
                        </p>
                        {/* Heritage statistic */}
                        <div className="mt-9 flex items-center gap-5">

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg">
                                <span className="text-xl font-extrabold text-islamic-gold">
                                    {t.about.heritage.year}+
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-primary">
                                    {t.about.heritage.title}
                                </p>

                                <p className="mt-1 text-xs text-accent">
                                    {t.about.heritage.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =========================================
                        IMAGE
                    ========================================== */}
                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto max-w-xl">
                            {/* Gold decorative frame */}
                            <div
                                className="
                                    absolute
                                    -bottom-4 -right-4
                                    h-full w-full
                                    rounded-[2rem]
                                    border-2 border-islamic-gold/40
                                "
                            />

                            {/* Image */}
                            <div className="group relative overflow-hidden rounded-[2rem] bg-primary shadow-2xl">
                                <img
                                    src="./bjm.webp"
                                    alt="Barkati Jame Masjid"
                                    loading="lazy"
                                    decoding="async"
                                    className="
                                        aspect-[4/3]
                                        h-full
                                        w-full
                                        object-cover
                                        transition-transform
                                        duration-700
                                        ease-out
                                        group-hover:scale-105
                                    "
                                />
                                {/* Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10" />

                                {/* Image content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-islamic-gold">
                                        {t.about.established}
                                    </p>

                                    <div className="mt-1 flex items-end justify-between gap-4">

                                        <h3 className="text-xl font-extrabold text-white md:text-2xl">
                                            {t.about.mosqueName}
                                        </h3>

                                        <span className="hidden text-4xl font-black leading-none text-white/30 sm:block md:text-5xl">
                                            {t.about.establishedYear}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================
                    DIVIDER
                ========================================== */}
                <div className="my-16 flex items-center gap-5 md:my-15">
                    <div className="h-px flex-1 bg-accent/20" />

                    <div className="h-2 w-2 rotate-45 bg-islamic-gold" />

                    <div className="h-px flex-1 bg-accent/20" />
                </div>

                {/* =========================================
                    FEATURES
                ========================================== */}
                <div className="grid gap-6 md:grid-cols-3">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="
                                    group
                                    rounded-2xl
                                    border border-accent/10
                                    bg-accent-gray
                                    p-7
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >

                                {/* Icon */}
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-primary
                                        transition-colors
                                        duration-300
                                        group-hover:bg-secondary-green
                                    "
                                >
                                    <Icon
                                        size={22}
                                        strokeWidth={1.8}
                                        className="text-islamic-gold"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mt-6 text-lg font-bold text-primary">
                                    {feature.title}
                                </h3>

                                {/* Body */}
                                <p className="mt-3 text-sm leading-7 text-accent">
                                    {feature.body}
                                </p>

                                {/* Bottom accent */}
                                <div className="mt-6 h-1 w-8 rounded-full bg-islamic-gold transition-all duration-300 group-hover:w-14" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;