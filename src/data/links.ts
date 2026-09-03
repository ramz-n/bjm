export interface LinkItem {
    title: string;
    path?: string;
    submenu?: LinkItem[];
}

export const links: LinkItem[] = [
    {
        title: "Home", path: "/"
    },
    {
        title: "About",
        submenu: [
            { title: "About Us", path: "/about-us" },
            { title: "Committee Members", path: "/committee-members" },
        ],
    },
    {
        title: "Prayer Timetables", path: "/prayer-timetable",
    },
    {
        title: "Key dates & Events",
        submenu: [
            { title: "Key Dates", path: "/key-dates" },
            { title: "Upcoming Events", path: "/upcoming-events" },
            { title: "All Events", path: "/all-events" }
        ]
    },
    {
        title: "Learn",
        submenu: [
            { title: "99 Names of Allah", path: "/99-names" },
            { title: "Learn Quran", path: "/learn" },
        ]
    },
    { title: "Donate", path: "/donate" },
];