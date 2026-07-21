import { namesData } from "../data/allah99names"

const Names = () => {

    return (
        <section id="schedule" className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-5 flex justify-between gap-4 items-center">
                <div>
                    <p className="font-bold text-xs uppercase tracking-[0.2em] text-primary">Asma Ul Husna</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold">99 Names of Allah</h2>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {namesData.map(names =>
                    <div key={names.number} className="bg-primary text-primary-dim flex flex-col text-center p-3 rounded-2xl gap-1 hover:bg-primary/90">
                        <p className="text-xl font-extrabold text-secondary">{names.number}. {names.arabic} ({names.transliteration})</p>
                        <p>{names.english}</p>
                        <p>{names.nepali}</p>
                        <p className="text-sm">{names.meaning}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Names