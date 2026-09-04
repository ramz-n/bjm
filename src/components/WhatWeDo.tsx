import { useLanguage } from "../context/LanguageContext";

const WhatWeDo = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-primary py-8">
            <section className="px-5">
                <div className="container mx-auto rounded-2xl flex flex-col items-center gap-5 py-5 p-5">
                    <p className="font-bold uppercase tracking-[0.22em] text-accent-dim">{t.whatWeDo.title}</p>
                    <h3 className="text-3xl md:text-5xl text-soft-yellow font-extrabold leading-[1.15] tracking-tight text-center">{t.whatWeDo.tagline}</h3>
                    <p className="text-primary-dim max-w-2xl text-center text-sm leading-7 md:text-base md:leading-8">{t.whatWeDo.description}</p>
                </div>
            </section>
        </div>
    )
}

export default WhatWeDo