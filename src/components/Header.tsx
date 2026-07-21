import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

const links = [
    { href: "/", label: "Home" },
    { href: "/prayer-timetable", label: "Prayer Timetable" },
    { href: "/key-dates", label: "Key Dates" },
    { href: "/99-names", label: "99 Names" },
];

const Header = () => {
    const [open, setOpen] = useState(false);

    // Reusable classes for the navigation links with bottom underline behavior
    // Add the type definition for the destructured object parameter
    const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
        `relative text-sm font-bold text-primary-dim transition-colors duration-200 hover:text-white py-2
     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-transform after:duration-200
     ${isActive ? 'after:scale-x-100 text-white' : 'after:scale-x-0 hover:after:scale-x-100'}`;

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-primary backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-10 h-18">

                {/* Logo wrapper using absolute placement on the image to offset it downwards */}
                <Link to="/" className="relative z-40 block h-full transition-transform duration-200 hover:scale-105">
                    <img
                        src="/logo-white13.png"
                        alt="BJM Logo"
                        className="absolute opacity-90 h-40 w-auto max-w-none object-contain"
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-9 md:flex">
                    {links.map((l, idx) => (
                        <li key={idx}>
                            <NavLink to={l.href} className={navLinkStyles}>
                                {l.label}
                            </NavLink>
                        </li>
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
                        {links.map((l) => (
                            <li key={l.href}>
                                <NavLink
                                    onClick={() => setOpen(false)}
                                    to={l.href}
                                    className={({ isActive }: { isActive: boolean }) =>
                                        `relative text-2xl font-medium transition-colors duration-200 py-2 block
                                        after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-12 after:bg-white after:transition-transform
                                        ${isActive ? 'text-white after:scale-x-100' : 'text-primary-dim hover:text-white after:scale-x-0 hover:after:scale-x-100'}`
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;