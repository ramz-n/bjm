import { useLanguage } from "../context/LanguageContext"

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-primary text-primary-dim bg-linear-to-r from-primary/50 via-primary/5 to-primary/90">
            <div className="mx-auto grid max-w-6xl 2xl:max-w-7xl gap-10 px-6 pt-13 pb-10 md:grid-cols-3">
                <div>
                    <img src="./logo-white.webp" alt="bjm" className="h-25" />
                </div>

                <div className="pl-6 md:pl-0">
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-white">{t.footer.visit}</p>
                    <address className="mt-3 space-y-1 font-body text-sm not-italic text-primary-dim/80">
                        <p>{t.footer.address.road}</p>
                        <p>{t.footer.address.location}</p>
                        <p>{t.footer.address.country}</p>
                        <p>{t.footer.openingHours}</p>
                    </address>
                </div>

                <div className="pl-6 md:pl-0">
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-white">{t.footer.contact}</p>
                    <ul className="mt-3 space-y-1 font-body text-sm text-primary-dim/80">
                        <li>info@bjm.com.np</li>
                        <li>{t.footer.phone}</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-primary/10 px-6 py-5 text-center font-body text-xs text-primary-dim/50">
                © {new Date().getFullYear()} {t.footer.title}. {t.footer.designedBy} <a href="https://www.qrcoders.site/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    QRCoders
                </a>
            </div>
        </footer>
    )
}

export default Footer