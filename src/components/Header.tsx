import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
    { href: "/", label: "Home" },
    { href: "/prayer-timetable", label: "Prayer Timetable" },
    { href: "/key-dates", label: "Key Dates" },
    { href: "/contact", label: "Contact" },
];

const Header = () => {

    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur bg-primary">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-10 py-4">
                <Link to="/" className="flex items-center gap-1 text-primary-dim">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brass-soft bg-verdigris-dim text-verdigris">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M12 7v5l3.2 1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight text-ink">
                        BJM
                    </span>
                </Link>

                <ul className="hidden items-center gap-9 md:flex">
                    {links.map((l, idx) => (
                        <Link key={idx} to={l.href}
                            className="text-sm font-bold text-primary-dim hover:text-secondary"
                        >
                            {l.label}
                        </Link>
                    ))}
                </ul>

                <button
                    aria-label="Open menu"
                    onClick={() => setOpen(true)}
                    className="md:hidden text-primary-dim"
                >
                    <Menu />
                </button>
            </nav>

            {open && (
                <div className="fixed inset-0 z-60 flex flex-col bg-primary text-primary-dim h-screen">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-1 text-primary-dim">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-dim">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M12 7v5l3.2 1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                            </span>
                            <span className="font-display text-lg font-semibold tracking-tight text-ink">
                                BJM
                            </span>
                        </div>
                        <button aria-label="Close menu" onClick={() => setOpen(false)}>
                            <X />
                        </button>
                    </div>
                    <ul className="flex flex-1 flex-col items-center justify-center gap-8 bg-primary">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Link
                                    onClick={() => setOpen(false)}
                                    to={l.href}
                                    className="text-xl font-medium hover:text-secondary"
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}

export default Header