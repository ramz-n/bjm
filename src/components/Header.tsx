import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavItem } from "./NavItem";

import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

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

    const { language, setLanguage, t } = useLanguage();
    const [langOpen, setLangOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const links = [
        {
            title: t.nav.home, path: "/"
        },
        {
            title: t.nav.about,
            submenu: [
                { title: t.nav.aboutUs, path: "/about-us" },
                { title: t.nav.committeMember, path: "/committee-members" },
            ],
        },
        {
            title: t.nav.prayerTimetable, path: "/prayer-timetable",
        },
        {
            title: t.nav.keyDatesAndEvents,
            submenu: [
                { title: t.nav.keyDates, path: "/key-dates" },
                { title: t.nav.upCommingEvents, path: "/upcoming-events" },
                { title: t.nav.allEvents, path: "/all-events" }
            ]
        },
        {
            title: t.nav.learn,
            submenu: [
                { title: t.nav.names99, path: "/99-names" },
                { title: t.nav.learnQuran, path: "/learn" },
            ]
        },
        { title: t.nav.donate, path: "/donate" },
    ];

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-primary">
            <nav
                className={`mx-auto flex max-w-6xl items-center justify-between px-10
                    ${scrolled ? "h-20" : "h-22"}
                    transition-all duration-300`}
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="relative z-40 block h-24 w-56 overflow-visible"
                >
                    {/* Large vertical logo */}
                    <img
                        src="/logo-white13.webp"
                        alt="BJM Logo"
                        className={`
                                absolute left-0 top-0
                                h-35 w-auto
                                object-contain
                                origin-top-left
                                transition-all duration-300 ease-in-out
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
                            absolute left-0 top-3
                            h-18 w-auto
                            py-1.5
                            object-contain
                            transition-all duration-300 ease-out
                            ${scrolled
                                ? "scale-100 opacity-100"
                                : "scale-75 opacity-0"
                            }
                        `}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-7 md:flex">
                    <ul className="flex items-center gap-9 whitespace-nowrap">
                        {links.map((link, idx) => (<NavItem key={idx} item={link} />))}
                    </ul>

                    {/* Language Switcher */}
                    <div className="relative hidden lg:block">
                        <button
                            type="button"
                            onClick={() => setLangOpen((v) => !v)}
                            aria-haspopup="listbox"
                            aria-expanded={langOpen}
                            className="
                                group
                                flex items-center gap-2
                                rounded-full
                                border border-white/15
                                bg-white/[0.04]
                                px-3.5 py-2
                                text-xs font-semibold tracking-wide
                                text-islamic-gold
                                shadow-sm
                                backdrop-blur-sm
                                transition-all duration-300 ease-out
                                hover:border-white/30
                                hover:bg-white/10
                                hover:text-white
                                hover:shadow-lg
                            "
                        >
                            {/* Globe */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                            >
                                <circle cx="12" cy="12" r="9" />
                                <path d="M3 12h18" />
                                <path d="M12 3a14 14 0 0 1 0 18" />
                                <path d="M12 3a14 14 0 0 0 0 18" />
                            </svg>

                            {/* Current Language */}
                            <span>
                                {language === "en" ? "English" : "नेपाली"}
                            </span>

                            {/* Chevron */}
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                className={`
                                    ml-0.5
                                    transition-transform duration-300
                                    ${langOpen ? "rotate-180" : ""}
                                `}
                            >
                                <path
                                    d="M1 1L5 5L9 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`
                                absolute right-0 top-full mt-2.5
                                w-40
                                origin-top-right
                                overflow-hidden
                                rounded-2xl
                                border border-white/15
                                bg-primary/95
                                shadow-2xl
                                backdrop-blur-xl
                                transition-all duration-200 ease-out
                                ${langOpen
                                    ? "visible translate-y-0 scale-100 opacity-100"
                                    : "invisible -translate-y-1 scale-95 opacity-0"
                                }
                            `}
                        >
                            <div className="p-2 space-y-1.5">
                                {langOptions.map((lng) => {
                                    const active = language === lng.value;

                                    return (
                                        <button
                                            key={lng.value}
                                            type="button"
                                            onClick={() => {
                                                setLanguage(lng.value as "en" | "np");
                                                setLangOpen(false);
                                            }}
                                            className={`
                                                flex w-full items-center justify-between
                                                rounded-xl
                                                px-3.5 py-2.5
                                                text-left text-sm
                                                
                                                transition-all duration-200
                                                ${active
                                                    ? "bg-white/10 text-islamic-gold"
                                                    : "text-primary-dim hover:bg-white/[0.07] hover:text-white"
                                                }
                                            `}
                                        >
                                            <span className="flex items-center gap-3">
                                                {/* Language indicator */}
                                                <span
                                                    className={`
                                                        flex h-7 w-7 items-center justify-center
                                                        rounded-full
                                                        text-[10px] font-bold
                                                        ${active
                                                            ? "bg-islamic-gold/15 text-islamic-gold"
                                                            : "bg-white/5 text-primary-dim"
                                                        }
                                                    `}
                                                >
                                                    {lng.value === "en" ? "EN" : "ने"}
                                                </span>

                                                <span>{lng.label}</span>
                                            </span>

                                            {/* Active check */}
                                            {active && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m5 12 4 4L19 6" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Trigger */}
                <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => setOpen(true)}
                    className="text-primary-dim transition-colors hover:text-white md:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 z-50 flex h-dvh w-screen max-w-full flex-col overflow-x-hidden bg-primary animate-fade-in">

                    {/* Mobile Header */}
                    <div className="relative flex shrink-0 items-center justify-between border-b border-line px-6 py-10 sm:px-8 sm:py-10">

                        {/* Mobile Logo */}
                        <img
                            src="/logo-white.webp"
                            alt="BJM Logo"
                            className="absolute left-1/2 top-1/2 h-16 w-auto max-w-[70vw] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-20"
                        />

                        {/* Close Button */}
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                            className="ml-auto shrink-0 text-primary-dim transition-colors hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Content */}
                    <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-primary px-6 pb-10">

                        {/* Mobile Navigation */}
                        <ul className="flex w-full flex-col items-center gap-8">
                            {links.map((link, idx) => (
                                <NavItem key={idx} item={link} />
                            ))}
                        </ul>

                        {/* Mobile Language Switcher */}
                        <div className="mt-10 flex max-w-full flex-col items-center">

                            <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-dim/60">
                                Language
                            </span>

                            <div className="flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/4 p-1.5 backdrop-blur-sm">

                                {langOptions.map((lng) => {
                                    const active = language === lng.value;

                                    return (
                                        <button
                                            key={lng.value}
                                            type="button"
                                            onClick={() =>
                                                setLanguage(lng.value as "en" | "np")
                                            }
                                            className={`
                                    flex shrink-0 items-center gap-2 rounded-full
                                    px-4 py-2
                                    text-sm font-semibold
                                    transition-all duration-200
                                    ${active
                                                    ? "bg-islamic-gold text-primary shadow-md"
                                                    : "text-primary-dim hover:bg-white/10 hover:text-white"
                                                }
                                `}
                                        >
                                            <span
                                                className={`
                                        flex h-6 w-6 shrink-0 items-center justify-center
                                        rounded-full text-[10px] font-bold
                                        ${active
                                                        ? "bg-primary/10 text-primary"
                                                        : "bg-white/5 text-primary-dim"
                                                    }
                                    `}
                                            >
                                                {lng.value === "en" ? "EN" : "ने"}
                                            </span>

                                            <span className="whitespace-nowrap">
                                                {lng.label}
                                            </span>
                                        </button>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;