const Footer = () => {
    return (
        <footer className="bg-primary text-primary-dim bg-linear-to-r from-primary/50 via-primary/5 to-primary/90">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
                <div>
                    <p className="font-display text-lg font-semibold">BJM</p>
                    <p className="mt-3 max-w-xs font-body text-sm text-primary-dim/70">
                        A community based and owned mosque/organization
                    </p>
                </div>

                <div>
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-white">Visit</p>
                    <address className="mt-3 space-y-1 font-body text-sm not-italic text-primary-dim/80">
                        <p>Lila Chowk</p>
                        <p>Narayangarh, Chitwan</p>
                        <p>Open daily, from 10am to 18pm</p>
                    </address>
                </div>

                <div>
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-white">Contact</p>
                    <ul className="mt-3 space-y-1 font-body text-sm text-primary-dim/80">
                        <li>info@bjm.com.np</li>
                        <li>+977 56-522732</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-primary/10 px-6 py-5 text-center font-body text-xs text-primary-dim/50">
                © {new Date().getFullYear()} Al Jamiatul Barkatiya Jame Masjid.
            </div>
        </footer>
    )
}

export default Footer