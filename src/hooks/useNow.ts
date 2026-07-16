import { useEffect, useState } from "react";

const useNow = (): Date => {
    const [now, setNow] = useState<Date>(() => new Date());

    useEffect(() => {
        const msToNextMinute = 60000 - (Date.now() % 60000);
        const timeout = setTimeout(() => {
            setNow(new Date());
            const interval = setInterval(() => setNow(new Date()), 60000);
            return () => clearInterval(interval);
        }, msToNextMinute);
        return () => clearTimeout(timeout);
    }, []);

    return now;
}

export default useNow