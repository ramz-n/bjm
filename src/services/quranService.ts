const BASE_URL = "https://ummahapi.com/api/quran/"

export const seachQuran = async (searchstring: string) => {
    try {
        const res = await fetch(`${BASE_URL}search?q=${searchstring}`)
        return res.json()

    } catch (error) {
        throw error
    }
} 