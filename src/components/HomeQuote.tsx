import { useLanguage } from "../context/LanguageContext";

const HomeQuote = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-primary py-10 md:py-8">
            <section className="px-5">
                <div className="container mx-auto rounded-2xl flex flex-col items-center gap-4 py-5 px-3">
                    <p className="font-bold uppercase tracking-[0.22em] text-center text-white text-sm">{t.whatWeDo.title}</p>
                    <h3 className="text-3xl md:text-5xl text-soft-yellow font-extrabold leading-[1.15] tracking-tight lg:tracking-normal 2xl:tracking-wider text-center">{t.whatWeDo.tagline}</h3>
                    <p className="max-w-2xl md:max-w-3xl 2xl:max-w-4xl text-center tracking-normal md:tracking-wide text-sm leading-7 text-primary-dim/95 sm:text-base md:text-lg md:leading-8">{t.whatWeDo.description}</p>
                </div>
            </section>
        </div>
    )
}

export default HomeQuote