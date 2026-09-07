import { useState } from "react"
import { seachQuran } from "../services/quranService"
import { Loader } from "lucide-react"

const Learn = () => {

    const [searchString, setSearchString] = useState("")
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null)

    const handleSearch = async () => {
        try {
            setLoading(true)
            const res = await seachQuran(searchString)
            setData(res.data)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false)
            setSearchString("")
        }
    }

    return (
        <section id="schedule" className="w-full">
            <div className="relative w-full h-[50vh] overflow-hidden">
                <img
                    src="/learn.webp"
                    alt="Key Dates"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Text */}
                <div className="absolute bottom-8 left-18">
                    <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
                        <h1 className="text-xl md:text-4xl font-bold text-white">
                            Learn Quran
                        </h1>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-5 flex justify-between gap-4 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-islamic-gold" />
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">Learn Holy Quran</p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
                            Search a
                            <span className="text-secondary-green"> topic</span>
                        </h2>
                    </div>

                </div>

                <div className="">
                    <div className="grid md:grid-cols-[1fr_200px] gap-2">
                        <input type="text" name="search" placeholder="Type a topic to learn" className="border-primary rounded-xl border-2 p-2" onChange={(e) => setSearchString(e.target.value)} />
                        <button className="bg-primary text-primary-dim py-3 px-3 md:py-0 rounded-xl cursor-pointer hover:bg-accent"
                            disabled={searchString.length === 0}
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>

                    {data?.results?.length > 0
                        && <p className="py-2">Searched <span className="italic font-semibold">{data?.query}</span>. Found {data?.results?.length} results.</p>}

                    <div className="flex flex-col gap-2">
                        {error && <p className="text-red-500">{error}</p>}
                        {loading ?
                            <Loader className="animate-spin" size={30} /> :
                            data?.results?.map((r: any, idx: number) =>
                                <div key={idx} className="bg-accent flex flex-col gap-3 text-primary-dim p-5 rounded-xl">
                                    <p className="font-bold">{r.surah_name} {r.surah_number}:{r.ayah}</p>
                                    <p className="text-secondary-dim">{r.arabic}</p>
                                    <p>{r.transliteration}</p>
                                    <p>{r.translation}</p>
                                </div>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Learn