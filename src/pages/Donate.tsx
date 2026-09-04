import { QrCode } from "lucide-react"

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
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            Donate
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Bring Change Through Giving  </p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">Small Donation, Big Impact</h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <p>Barkati Masjid runs various charitable initiatives and welcomes donations to support our community services and programs.</p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <h3 className="font-bold text-xl">Our Projects</h3>

                            <div className="flex flex-row items-center justify-between gap-10 border border-primary p-4 rounded-lg">
                                <div>
                                    <h4 className="font-bold">Masjid Donation</h4>
                                    <p>Support the upkeep and maintenance of Barkati Masjid, ensuring it remains a welcoming place for worship and community gatherings.</p>
                                </div>
                                <div>
                                    <QrCode size={100} />
                                    <p className="text-sm text-muted-foreground">
                                        Scan to donate
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-10 border border-primary p-4 rounded-lg mt-10">
                                <div>
                                    <h4 className="font-bold">Emergency Appeal</h4>
                                    <p>Support our emergency relief efforts to help those in need during times of crisis.</p>
                                </div>
                                <div>
                                    <QrCode size={100} />
                                    <p className="text-sm text-muted-foreground">
                                        Scan to donate
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-between gap-10 border border-primary p-4 rounded-lg mt-10">
                                <div>
                                    <h4 className="font-bold">Help poor & needy</h4>
                                    <p>Support our efforts to provide assistance and support to those in need within our community.</p>
                                </div>
                                <div>
                                    <QrCode size={100} />
                                    <p className="text-sm text-muted-foreground">
                                        Scan to donate
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

export default Domate 