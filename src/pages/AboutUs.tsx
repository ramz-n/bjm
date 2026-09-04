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
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            About Barkati Masjid
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-islamic-gold">The Oldest mosques in Chitwan</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">Al Jamiatul Barkatiya Jame Masjid</h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>
                                Barkati Masjid (aka <strong>Al-jame Atul Barkatiya Barkati Jame Masjid</strong>) stands as a peaceful and a learning spiritual center for the Muslim community in the heart of Narayanghat and Bharatpur. Located near Lila Chowk and Pragati Path, the mosque offers a quiet and clean environment for daily prayers, community ceremonies, and Friday gatherings.
                            </p>
                            <p>
                                It serves not only as a house of worship but also as a vital gathering space that fosters unity, peace, and mutual support among neighbors and visitors alike.
                            </p>

                            <h3 className="flex items-center justify-start gap-2 font-semibold text-lg mt-6">
                                <Landmark />
                                Historical Significance
                            </h3>
                            <ul>
                                <li><strong>Establishment: </strong>Founded in <strong>1959 A.D.</strong> (2016B.S.), it is recognized as the <strong>oldest mosque in Chitwan</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AboutUs