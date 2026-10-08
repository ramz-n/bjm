const comitteeMembers = [
    {
        name: "Haji Kaji Miya",
        position: "Chairman",
        bio: "Haji Kaji Miya is a respected member and the current chairman of Barkati Masjid, known for his dedication to spiritual guidance and community service.",
    },
    {
        name: "Kalamuddin Miya",
        position: "Vice-Chairman",
        bio: "Kalamuddin Miya is a respected member and the current vice-chairman of Barkati Masjid.",
    },
    {
        name: "Munaf Miya",
        position: "Secretary",
        bio: "Munaf Miya is the current secretary of Barkati Masjid.",
    },
    {
        name: "Saroj Khan",
        position: "Treasurer",
        bio: "Saroj Khan is the current treasurer of Barkati Masjid.",
    },
    {
        name: "Mohammad Ismail",
        position: "Board Member",
        bio: "Mohammad Ismail is one of the dedicated members of Barkati Masjid.",
    },
    {
        name: "Hasan Miya",
        position: "Board Member",
        bio: "Hasan Miya is one of the dedicated members of Barkati Masjid.",
    },
    {
        name: "Jamal Miya",
        position: "Board Member",
        bio: "Jamal Miya is one of the dedicated members of Barkati Masjid.",
    },
    {
        name: "Kuresh Ahmad",
        position: "Board Member",
        bio: "Kuresh Ahmad is one of the dedicated members of Barkati Masjid.",
    },
];

const Committee = () => {
    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/committee.jpg"
                    alt="committee members"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            Committe Members
                        </h1>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">
                                Active committee members
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Our Respected Committee
                            <span className="text-secondary-green">
                                {" "}
                                Members
                            </span>
                        </h2>

                        <div className="grid gap-6 md:grid-cols-3 mt-8">
                            {comitteeMembers.map((member, idx) => {
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
                                        <img
                                            src="./member.svg"
                                            alt=""
                                            className="h-30 w-30"
                                        />

                                        {/* Title */}
                                        <h3 className="mt-6 text-xl font-bold text-primary">
                                            {member.name}
                                        </h3>

                                        <p className="mt-0.5 text-sm font-bold text-secondary-green">
                                            {member.position}
                                        </p>

                                        {/* Body */}
                                        <p className="mt-3 text-sm leading-7 text-accent">
                                            {member.bio}
                                        </p>

                                        {/* Bottom accent */}
                                        <div className="mt-6 h-1 w-8 rounded-full bg-islamic-gold transition-all duration-300 group-hover:w-14" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Committee;
