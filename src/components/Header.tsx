import { useEffect, useState } from "react";
import {
    Menu,
    X,
    ChevronDown,
    Globe,
} from "lucide-react";
import {
    Link,
    useLocation,
} from "react-router-dom";

import { NavItem } from "./NavItem";
import { useLanguage } from "../context/LanguageContext";

import type { LinkItem } from "../types";

const langOptions = [
    {
        label: "English",
        value: "en",
    },
    {
        label: "Nepali",
        value: "np",
    },
];

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const {
        language,
        setLanguage,
        t,
    } = useLanguage();

    const location = useLocation();

    /*
     * -------------------------------------------------------
     * SCROLL DETECTION
     * -------------------------------------------------------
     */

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    /*
     * -------------------------------------------------------
     * CLOSE MOBILE MENU WHEN ROUTE CHANGES
     * -------------------------------------------------------
     */

    useEffect(() => {
        setOpen(false);
        setLangOpen(false);
    }, [location.pathname]);

    /*
     * -------------------------------------------------------
     * NAVIGATION LINKS
     * -------------------------------------------------------
     */

    const links: LinkItem[] = [
        {
            title: t.nav.home,
            path: "/",
        },

        {
            title: t.nav.about,
            path: "/about-us",

            submenu: [
                {
                    title: t.nav.aboutUs,
                    path: "/about-us",
                },
                {
                    title: t.nav.committeMember,
                    path: "/committee-members",
                },
            ],
        },

        {
            title: t.nav.prayerTimetable,
            path: "/prayer-timetable",
        },

        {
            title: t.nav.keyDatesAndEvents,
            path: "/key-dates",

            submenu: [
                {
                    title: t.nav.keyDates,
                    path: "/key-dates",
                },
                {
                    title: t.nav.upCommingEvents,
                    path: "/upcoming-events",
                },
                {
                    title: t.nav.allEvents,
                    path: "/all-events",
                },
            ],
        },

        {
            title: t.nav.learn,
            path: "/learn",

            submenu: [
                {
                    title: t.nav.names99,
                    path: "/99-names",
                },
                {
                    title: t.nav.learnQuran,
                    path: "/learn",
                },
            ],
        },

        {
            title: t.nav.donate,
            path: "/donate",
        },
    ];

    return (
        <header
            className="
                sticky top-0 z-30
                border-b border-line
                bg-primary
            "
        >
            {/* =================================================
                MAIN NAVIGATION
            ================================================= */}

            <nav
                className={`
                    mx-auto
                    flex
                    max-w-6xl
                    items-center
                    justify-between
                    px-4
                    sm:px-6
                    lg:px-8
                    2xl:max-w-7xl

                    ${scrolled
                        ? "h-20"
                        : "h-22"
                    }

                    transition-all duration-300
                `}
            >
                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    className="
                        relative z-40
                        block
                        h-20 w-40
                        shrink-0
                        overflow-visible
                        sm:h-24 sm:w-52
                    "
                >
                    {/* Large vertical logo */}

                    <img
                        src="/logo-white13.webp"
                        alt="BJM Logo"
                        className={`
                            absolute
                            left-0
                            top-0
                            h-28
                            w-auto
                            origin-top-left
                            object-contain
                            transition-all
                            duration-300
                            ease-in-out

                            sm:h-35

                            ${scrolled
                                ? "translate-x-2 translate-y-2 scale-50 opacity-0"
                                : "translate-x-0 translate-y-0 scale-100 opacity-90"
                            }
                        `}
                    />

                    {/* Small horizontal logo */}

                    <img
                        src="/logo-scroll.webp"
                        alt="BJM Logo"
                        className={`
                            absolute
                            left-0
                            top-3
                            h-15.5
                            md:h-18
                            w-auto
                            object-contain
                            transition-all
                            duration-300
                            ease-out

                            sm:top-3
                            sm:h-18

                            ${scrolled
                                ? "scale-100 opacity-100"
                                : "scale-75 opacity-0"
                            }
                        `}
                    />
                </Link>

                {/* =================================================
                    DESKTOP NAVIGATION
                ================================================= */}

                <div
                    className="
                        hidden
                        min-w-0
                        items-center
                        gap-5
                        md:flex
                        lg:gap-7
                    "
                >
                    <ul
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-5
                            whitespace-nowrap
                            lg:gap-7
                            2xl:gap-9
                        "
                    >
                        {links.map((link) => (
                            <NavItem
                                key={link.path}
                                item={link}
                            />
                        ))}
                    </ul>

                    {/* =================================================
                        DESKTOP LANGUAGE SWITCHER
                    ================================================= */}

                    <div
                        className="
                            relative
                            hidden
                            shrink-0
                            lg:block
                        "
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setLangOpen(
                                    (previous) =>
                                        !previous
                                )
                            }
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            className="
                                group
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/15
                                bg-white/[0.04]
                                px-3.5
                                py-2
                                text-xs
                                font-semibold
                                tracking-wide
                                text-islamic-gold
                                shadow-sm
                                backdrop-blur-sm
                                transition-all
                                duration-300
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                                hover:shadow-lg
                            "
                        >
                            <Globe
                                className="
                                    h-3.5 w-3.5
                                    opacity-70
                                    transition-opacity
                                    duration-300
                                    group-hover:opacity-100
                                "
                            />

                            <span className="whitespace-nowrap">
                                {language === "en"
                                    ? "English"
                                    : "नेपाली"}
                            </span>

                            <ChevronDown
                                className={`
                                    h-3.5 w-3.5
                                    transition-transform
                                    duration-300
                                    ${langOpen
                                        ? "rotate-180"
                                        : ""
                                    }
                                `}
                            />
                        </button>

                        {/* Language dropdown */}

                        <div
                            className={`
                                absolute
                                right-0
                                top-full
                                z-50
                                mt-3
                                w-48
                                origin-top-right
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-primary/98
                                shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                                backdrop-blur-xl
                                transition-all
                                duration-200

                                ${langOpen
                                    ? "visible translate-y-0 scale-100 opacity-100"
                                    : "invisible -translate-y-2 scale-95 opacity-0"
                                }
                            `}
                        >
                            {/* Gold accent */}

                            <div
                                className="
                                    h-0.5
                                    w-full
                                    bg-islamic-gold
                                "
                            />

                            <div className="p-2 space-y-1.5">
                                <div
                                    className="
                                        px-3
                                        pb-2
                                        pt-1
                                    "
                                >
                                    <p
                                        className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.2em]
                                            text-primary-dim/50
                                        "
                                    >
                                        {t.nav.language}
                                    </p>
                                </div>

                                {langOptions.map(
                                    (lng) => {
                                        const active =
                                            language ===
                                            lng.value;

                                        return (
                                            <button
                                                key={
                                                    lng.value
                                                }
                                                type="button"
                                                onClick={() => {
                                                    setLanguage(
                                                        lng.value as
                                                        | "en"
                                                        | "np"
                                                    );

                                                    setLangOpen(
                                                        false
                                                    );
                                                }}
                                                className={`
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    transition-all
                                                    duration-200

                                                    ${active
                                                        ? "bg-islamic-gold/15 text-islamic-gold"
                                                        : "text-primary-dim hover:bg-white/10 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <span
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                    "
                                                >
                                                    <span
                                                        className={`
                                                            flex
                                                            h-8 w-8
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            border
                                                            text-[10px]
                                                            font-bold

                                                            ${active
                                                                ? "border-islamic-gold/15 bg-islamic-gold/15 text-islamic-gold"
                                                                : "border-white/10 bg-white/5 text-primary-dim"
                                                            }
                                                        `}
                                                    >
                                                        {lng.value ===
                                                            "en"
                                                            ? "EN"
                                                            : "ने"}
                                                    </span>

                                                    <span
                                                        className="
                                                            whitespace-nowrap
                                                            text-sm
                                                            font-semibold
                                                        "
                                                    >
                                                        {
                                                            lng.label
                                                        }
                                                    </span>
                                                </span>

                                                {active && (
                                                    <span
                                                        className="
                                                            flex
                                                            h-5 w-5
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-full
                                                            bg-primary/10
                                                        "
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="m5 12 4 4L19 6" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    MOBILE MENU BUTTON
                ================================================= */}

                <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={open}
                    onClick={() => setOpen(true)}
                    className="
                        flex
                        h-10 w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        text-primary-dim
                        transition-all
                        duration-200
                        hover:bg-white/10
                        hover:text-white
                        md:hidden
                    "
                >
                    <Menu className="h-6 w-6" />
                </button>
            </nav>

            {/* =================================================
                MOBILE MENU
            ================================================= */}

            {open && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        h-dvh
                        w-screen
                        max-w-full
                        flex-col
                        overflow-x-hidden
                        bg-primary
                        animate-fade-in
                    "
                >
                    {/* Mobile header */}

                    <div
                        className="
                            relative
                            flex
                            shrink-0
                            items-center
                            justify-between
                            border-b
                            border-line
                            px-5
                            py-7
                            sm:px-8
                            sm:py-8
                        "
                    >
                        {/* Mobile logo */}

                        <img
                            src="/logo-white.webp"
                            alt="BJM Logo"
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                h-15.5
                                w-auto
                                mt-1
                                max-w-[65vw]
                                -translate-x-1/2
                                -translate-y-1/2
                                object-contain
                                sm:h-18
                            "
                        />

                        {/* Close */}

                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="
                                ml-auto
                                flex
                                h-10 w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                text-primary-dim
                                transition-all
                                duration-200
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile content */}

                    <div
                        className="
                            flex
                            min-h-0
                            flex-1
                            flex-col
                            items-center
                            justify-start
                            overflow-y-auto
                            overflow-x-hidden
                            bg-primary
                            px-5
                            pb-10
                            pt-8
                            sm:px-8
                            sm:pt-10
                        "
                    >
                        {/* Mobile navigation */}

                        <ul
                            className="
                                flex
                                w-full
                                max-w-md
                                flex-col
                                items-center
                                gap-4
                            "
                        >
                            {links.map((link) => (
                                <NavItem
                                    key={link.path}
                                    item={link}
                                />
                            ))}
                        </ul>

                        {/* =================================================
                            MOBILE LANGUAGE SWITCHER
                        ================================================= */}

                        <div
                            className="
                                mt-10
                                flex
                                max-w-full
                                flex-col
                                items-center
                            "
                        >
                            <span
                                className="
                                    mb-3
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-primary-dim/60
                                "
                            >
                                Language
                            </span>

                            <div
                                className="
                                    flex
                                    max-w-full
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    p-1.5
                                    backdrop-blur-sm
                                "
                            >
                                {langOptions.map(
                                    (lng) => {
                                        const active =
                                            language ===
                                            lng.value;

                                        return (
                                            <button
                                                key={
                                                    lng.value
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setLanguage(
                                                        lng.value as
                                                        | "en"
                                                        | "np"
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    shrink-0
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-semibold
                                                    transition-all
                                                    duration-200

                                                    ${active
                                                        ? "bg-islamic-gold text-primary shadow-md"
                                                        : "text-primary-dim hover:bg-white/10 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <span
                                                    className={`
                                                        flex
                                                        h-6 w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        text-[10px]
                                                        font-bold

                                                        ${active
                                                            ? "bg-primary/10 text-primary"
                                                            : "bg-white/5 text-primary-dim"
                                                        }
                                                    `}
                                                >
                                                    {lng.value ===
                                                        "en"
                                                        ? "EN"
                                                        : "ने"}
                                                </span>

                                                <span className="whitespace-nowrap">
                                                    {
                                                        lng.label
                                                    }
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;