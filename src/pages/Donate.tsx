import { QrCode } from "lucide-react"

const charityProjects = [
    { title: "Masjid Donation", description: "Support the upkeep and maintenance of Barkati Masjid, ensuring it remains a welcoming place for worship and community gatherings.", image: QrCode },
    { title: "Emergency Appeal", description: "Support our emergency relief efforts to help those in need during times of crisis.", image: QrCode },
    { title: "Help poor & needy", description: "Donate our emergency relief efforts to help those in need during times of crisis.", image: QrCode }
]

const Domate = () => {
    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/charity.webp"
                    alt="hands"
                    className="absolute inset-0 w-full h-full object-fill"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            Donate
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">bring change by giving</p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Small Donation, Big
                            <span className="text-secondary-green"> Impact</span>
                        </h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>Barkati Masjid runs various charitable initiatives and welcomes donations to support our community services and programs.</p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <h3 className="font-bold text-xl mb-5">Our Projects</h3>

                            <div className="grid grid-cols-1 gap-5">
                                {charityProjects.map((project, idx) => {

                                    const Icon = project.image

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
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    {/* Title */}
                                                    <h3 className="mt-6 text-lg font-bold text-primary">
                                                        {project.title}
                                                    </h3>

                                                    {/* Body */}
                                                    <p className="mt-3 text-sm leading-7 text-accent">
                                                        {project.description}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center">
                                                    <Icon size={120} />
                                                    <p>Scan to donate</p>
                                                </div>
                                            </div>

                                            {/* Bottom accent */}
                                            <div className="mt-6 h-1 w-8 rounded-full bg-islamic-gold transition-all duration-300 group-hover:w-14" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Domate 