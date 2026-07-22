import { useMemo } from "react";
import Hero from "../components/Hero"
import WhatWeDo from "../components/WhatWeDo"
import useNow from "../hooks/useNow";
import { getMonthSchedule, isoKeyFor } from "../data/prayer-schedule";
import About from "../components/About";


const Home = () => {

    const now = useNow();

    const month = useMemo(
        () => getMonthSchedule(now),
        [now.getFullYear(), now.getMonth()],
    );
    const todayIsoKey = useMemo(
        () => isoKeyFor(now),
        [now.getFullYear(), now.getMonth(), now.getDate()],
    );

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowIso = isoKeyFor(tomorrow);
    const tomorrowMonth = tomorrow.getMonth() === now.getMonth() ? month : getMonthSchedule(tomorrow);

    const todayEntry = month.days.find((d) => d.isoKey === todayIsoKey) ?? month.days[0];
    const tomorrowEntry = tomorrowMonth.days.find((d) => d.isoKey === tomorrowIso) ?? tomorrowMonth.days[0];

    return (
        <div>
            <Hero now={now} todayEntry={todayEntry} tomorrowEntry={tomorrowEntry} />
            <About />
            <WhatWeDo />
        </div>
    )
}

export default Home