import { Landmark } from "lucide-react"

const AboutUs = () => {
    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/bjm-about.webp"
                    alt="Barkati Masjid"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            About Barkati Masjid
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">The oldest mosque in chitwan</p>
                        </div>

                        <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Al Jamiatul Barkatiya Jame
                            <span className="text-secondary-green"> Masjid</span>
                        </h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>
                                Barkati Masjid (aka <strong>Al-jame Atul Barkatiya Barkati Jame Masjid</strong>) stands as a peaceful and a learning spiritual center for the Muslim community in the heart of Narayanghat and Bharatpur. Located near Lila Chowk and Pragati Path, the mosque offers a quiet and clean environment for daily prayers, community ceremonies, and Friday gatherings.
                            </p>
                            <p>
                                It serves not only as a house of worship but also as a vital gathering space that fosters unity, peace, and mutual support among neighbors and visitors alike.
                            </p>

                            <div className="mt-9 flex items-center gap-5">

                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary shadow-lg">
                                    <span className="text-xl font-extrabold text-islamic-gold">
                                        <Landmark />
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-primary">
                                        Historical Significance
                                    </p>

                                    <p className="mt-1 text-xs text-accent">
                                        Founded in 1959 A.D. (2016B.S.), it is recognized as the oldest mosque in Chitwan
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutUs