import { CalendarHeart, HandHelping, Handshake, type LucideIcon } from "lucide-react";

interface Features {
    icon: LucideIcon,
    title: string;
    body: string;
}

const features: Features[] = [
    {
        icon: Handshake,
        title: "Community Owned",
        body: "BJM is a registered mosqued owned by the community in Chitwan.",
    },
    {
        icon: CalendarHeart,
        title: "Events & Congregation",
        body: "The mosque conducts various events and congregational prayers",
    },
    {
        icon: HandHelping,
        title: "Charity Program",
        body: "The mosques helps poor and needy through its charity program.",
    },
];

const About = () => {
    return (
        <section className="border-y">
            <div className="mx-auto container px-5 py-16 flex flex-col items-center gap-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary/90">About Al Jamiatul Barkatiya Jame Masjid</p>
                        <h2 className="mt-2 max-w-xl font-display text-xl md:text-3xl font-semibold">
                            Barkati Jame Masjid is one of the oldest mosque located in Narayanghat, Chitwan. Established in 1955 AD, the mosque has been helping community actively.
                        </h2>
                        <p className="text-muted-foreground leading-8">
                            Al Jamiatul Barkatiya Jame Masjid has served the Muslim community of
                            Narayanghat for decades by providing a place for worship, Islamic
                            education, charity, and social gatherings. It continues to welcome
                            everyone with a spirit of unity, compassion, and service.
                        </p>
                    </div>
                    <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl"></div>

                            <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="./bjm.webp"
                                    alt="Barkati Jame Masjid"
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Decorative Border */}
                        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />

                        {/* Text on image */}
                        <div className="absolute bottom-6 left-6">
                            <p className="text-sm uppercase tracking-widest text-white/80">
                                Since 1955
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                                Barkati Jame Masjid
                            </h3>
                        </div>
                    </div>
                    
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="border-t-2 pt-4">
                            <feature.icon size={50} />
                            <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                            <p className="mt-2 font-body text-sm">{feature.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About