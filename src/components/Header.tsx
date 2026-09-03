import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "../data/links";
import { NavItem } from "./NavItem";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        handleScroll(); // Set initial state

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-primary backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-10 h-18">

                {/* Logo wrapper using absolute placement on the image to offset it downwards */}
                <Link
                    to="/"
                    className="relative z-40 block w-56 h-24 overflow-visible"
                >
                    {/* Large vertical logo */}
                    <img
                        src="/logo-white13.png"
                        alt="BJM Logo"
                        className={`
                            absolute left-0 top-0
                            h-40 w-auto
                            object-contain
                            origin-top-left
                            transition-all duration-300 ease-in-out
                            ${scrolled
                                ? "opacity-0 scale-50 translate-x-2 translate-y-2"
                                : "opacity-90 scale-100 translate-x-0 translate-y-0"
                            }
                        `}
                    />

                    {/* Small horizontal logo */}
                    <img
                        src="/logo-scroll.png"
                        alt="BJM Logo"
                        className={`
                            absolute left-0 top-3
                            py-1
                            pl-3
                            h-18 w-auto
                            object-contain
                            transition-all duration-300 ease-out-in
                            ${scrolled
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                            }
                        `}
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-9 md:flex">
                    {links.map((l, idx) => (
                        <NavItem key={idx} item={l} />
                    ))}
                </ul>

                {/* Mobile Trigger */}
                <button
                    aria-label="Open menu"
                    onClick={() => setOpen(true)}
                    className="md:hidden text-primary-dim hover:text-white transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 z-50 flex flex-col bg-primary h-screen animate-fade-in">
                    <div className="flex items-center justify-between px-8 py-6 border-b border-line">
                        <img
                            src="/logo-white.png"
                            alt="BJM Logo"
                            className="absolute top-1/2 -translate-y-1/3 h-28 md:h-36 w-auto max-w-none object-contain"
                        />
                        <button aria-label="Close menu" onClick={() => setOpen(false)} className="hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <ul className="flex flex-1 flex-col items-center justify-center gap-8 bg-primary pb-20 z-10">
                        {links.map((l, idx) => (
                            <NavItem key={idx} item={l} />
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;