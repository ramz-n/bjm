const MasjidMap = () => {
    return (
        <section>
            <div>
                <h1 className="mb-5 text-center text-3xl font-bold text-primary">Masjid Location</h1>
                {/* Directions */}
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Al-jame+Atul+Barkatiya+Barkati+Jame+Masid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-islamic-gold px-6 py-3 text-sm font-bold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d7b12d] hover:shadow-lg"
                >
                    Get Directions
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ml-2 h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M13 6l6 6-6 6"
                        />
                    </svg>
                </a>
            </div>


            {/* Map card */}
            <div className="overflow-hiddenbg-white shadow-lg shadow-primary/10">

                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.569875118396!2d84.42493427405277!3d27.699685925831897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fbcd3f47cbed%3A0x5c4cb26456a049cb!2sAl-jame%20Atul%20Barkatiya%20Barkati%20Jame%20Masid!5e0!3m2!1sen!2snp!4v1787651106779!5m2!1sen!2snp"
                    className="block h-[300px] w-full sm:h-[300px] md:h-[300px] lg:h-[300px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Al-Jamaetul Barkatiya Jame Masjid location"
                />

            </div>


        </section>
    )
}

export default MasjidMap