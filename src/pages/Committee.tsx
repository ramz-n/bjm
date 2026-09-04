import { Phone } from "lucide-react"

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
                    <div className="rounded-2xl bg-accent px-6 py-3 shadow-lg backdrop-blur-sm">
                        <h1 className="text-4xl font-bold text-white">
                            Committee Members
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Active committee members</p>
                        <h2 className="mt-2 font-display text-3xl font-semibold">Our Respected Committee Members</h2>

                        <div className="mt-6 flex flex-col gap-3">
                            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                    <div>
                                        <img
                                            src="./kaaji-saheb.PNG"
                                            alt=""
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h3
                                                        id="TeamMember1Name"
                                                        className="text-lg/tight font-semibold text-gray-900"
                                                    >
                                                        Hafiz Kaaji Saheb
                                                    </h3>
                                                    <p className="mt-0.5 text-sm text-gray-700">Sadar (Chairman)</p>
                                                    <p className="flex items-center gap-2 py-1 text-sm font-bold text-primary/90">
                                                        <Phone size={16} /> 9876543210
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-pretty text-gray-700">
                                                Hafiz Kaaji Saheb is a respected member and the current chairman of Barkati Masjid, known for his dedication to spiritual guidance and community service. He has been instrumental in leading various initiatives and fostering a sense of unity among members.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <img
                                            src="./kaaji-saheb.PNG"
                                            alt=""
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h3
                                                        id="TeamMember1Name"
                                                        className="text-lg/tight font-semibold text-gray-900"
                                                    >
                                                        Hafiz Kaaji Saheb
                                                    </h3>
                                                    <p className="mt-0.5 text-sm text-gray-700">Sadar (Chairman)</p>
                                                    <p className="flex items-center gap-2 py-1 text-sm font-bold text-primary/90">
                                                        <Phone size={16} /> 9876543210
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-pretty text-gray-700">
                                                Hafiz Kaaji Saheb is a respected member and the current chairman of Barkati Masjid, known for his dedication to spiritual guidance and community service. He has been instrumental in leading various initiatives and fostering a sense of unity among members.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src="./kaaji-saheb.PNG"
                                            alt=""
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h3
                                                        id="TeamMember1Name"
                                                        className="text-lg/tight font-semibold text-gray-900"
                                                    >
                                                        Hafiz Kaaji Saheb
                                                    </h3>
                                                    <p className="mt-0.5 text-sm text-gray-700">Sadar (Chairman)</p>
                                                    <p className="flex items-center gap-2 py-1 text-sm font-bold text-primary/90">
                                                        <Phone size={16} /> 9876543210
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-pretty text-gray-700">
                                                Hafiz Kaaji Saheb is a respected member and the current chairman of Barkati Masjid, known for his dedication to spiritual guidance and community service. He has been instrumental in leading various initiatives and fostering a sense of unity among members.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Committee