const AllEvents = () => {
    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/dua.avif"
                    alt="hands"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            All Events
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">All Events from Barkati Masjid</p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Events by Barkati
                            <span className="text-secondary-green"> Masjid</span>
                        </h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>
                                Stay tuned for our AllEvents  events, including community gatherings, educational workshops, and special religious observances. We are committed to fostering a vibrant and inclusive environment for all members of our community. Check back regularly for updates on event dates, times, and locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default AllEvents 