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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary/90">About Al Jamiatul Barkatiya Jame Masjid</p>
                        <h2 className="mt-2 max-w-xl font-display text-xl md:text-3xl font-semibold">
                            Barkati Jame Masjid is one of the oldest mosque located in Narayanghat, Chitwan. Established in 1955 AD, the mosque has been helping community actively.
                        </h2>
                    </div>
                    <div>
                        <img className="relative rounded-2xl " src="./bjm.webp" alt="barkati masjid" />
                        {/* Optional dark overlay */}
                        <div className="absolute inset-0 bg-black/30" />

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