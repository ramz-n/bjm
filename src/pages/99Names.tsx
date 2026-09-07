import { namesData } from "../data/allah99names"

const Names = () => {

    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/99names.webp"
                    alt="Key Dates"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            99 Names of Allah
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-8 flex justify-between gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">Asma Ul Husna</p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Learn the names of
                            <span className="text-secondary-green"> Allah</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {namesData.map((name, idx) => {
                        return (
                            <div
                                key={idx}
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
                                {/* Title */}
                                <h3 className="mt-6 text-lg font-bold text-primary">
                                    {name.number}. {name.arabic} ({name.transliteration})
                                </h3>

                                {/* Body */}
                                <p className="mt-3 text-sm leading-7 text-accent">
                                    {name.english} ({name.nepali})
                                </p>

                                <p className="mt-3 text-sm leading-7 text-accent">
                                    {name.meaning}
                                </p>

                                {/* Bottom accent */}
                                <div className="mt-6 h-1 w-8 rounded-full bg-islamic-gold transition-all duration-300 group-hover:w-14" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Names