import { Landmark } from "lucide-react"

const Upcoming = () => {
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
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            Upcoming Events
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">New events</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">Upcoming Events</h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>
                                Stay tuned for our upcoming events, including community gatherings, educational workshops, and special religious observances. We are committed to fostering a vibrant and inclusive environment for all members of our community. Check back regularly for updates on event dates, times, and locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Upcoming