import { useState, useRef, useEffect } from "react";
import type { LinkItem } from "../types";

export function NavItem({ item }: { item: LinkItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
        `relative text-sm font-bold text-primary-dim transition-colors duration-200 hover:text-white py-2
     after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-white after:transition-transform after:duration-200
     ${isActive ? 'after:scale-x-100 text-white' : 'after:scale-x-0 hover:after:scale-x-100'}`;

    if (!item.submenu) {
        return (
            <a href={item.path} className={navLinkStyles({ isActive: false })}>
                {item.title}
            </a>
        );
    }

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={navLinkStyles({ isActive: false }) + " flex items-center gap-1"}
            >
                {item.title}
                <svg className={`ml-1 h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                        {item.submenu.map((sub, index) => (
                            <a
                                key={index}
                                href={sub.path}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                {sub.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}