import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import type { LinkItem } from "../types";

interface NavItemProps {
    item: LinkItem;
}

export function NavItem({ item }: NavItemProps) {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const dropdownRef = useRef<HTMLLIElement>(null);
    const location = useLocation();

    const hasSubmenu = Boolean(item.submenu?.length);

    /*
     * Check whether this item or one of its submenu
     * items is currently active.
     */
    const isActive =
        item.path === location.pathname ||
        item.submenu?.some(
            (subItem) => subItem.path === location.pathname
        );

    /*
     * Automatically open the submenu when the user
     * is currently inside one of its pages.
     */
    useEffect(() => {
        if (isActive && hasSubmenu) {
            setSubmenuOpen(true);
        }
    }, [isActive, hasSubmenu]);

    /*
     * Close desktop dropdown when clicking outside.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setSubmenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    /*
     * Close submenu with Escape.
     */
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSubmenuOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    /*
     * -------------------------------------------------------
     * NORMAL NAVIGATION ITEM
     * -------------------------------------------------------
     */

    if (!hasSubmenu) {
        return (
            <li className="w-full shrink-0 md:w-auto">
                <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                        relative flex w-full items-center
                        whitespace-nowrap
                        px-1 py-2
                        text-sm font-semibold
                        transition-colors duration-200
                        md:w-auto

                        ${isActive
                            ? "text-islamic-gold"
                            : "text-primary-dim hover:text-white"
                        }

                        after:absolute
                        after:bottom-0
                        after:left-0
                        after:h-[2px]
                        after:w-full
                        after:origin-left
                        after:bg-islamic-gold
                        after:transition-transform
                        after:duration-200

                        ${isActive
                            ? "after:scale-x-100"
                            : "after:scale-x-0 hover:after:scale-x-100"
                        }
                    `}
                >
                    {item.title}
                </NavLink>
            </li>
        );
    }

    /*
     * -------------------------------------------------------
     * NAVIGATION ITEM WITH SUBMENU
     * -------------------------------------------------------
     */

    return (
        <li
            ref={dropdownRef}
            className="relative w-full shrink-0 md:w-auto"
            /*
             * Desktop:
             * Open submenu when mouse enters.
             */
            onMouseEnter={() => {
                if (window.innerWidth >= 768) {
                    setSubmenuOpen(true);
                }
            }}
            onMouseLeave={() => {
                if (window.innerWidth >= 768) {
                    setSubmenuOpen(false);
                }
            }}
        >
            {/* Parent button */}

            <button
                type="button"
                onClick={() =>
                    setSubmenuOpen((previous) => !previous)
                }
                aria-expanded={submenuOpen}
                aria-haspopup="true"
                className={`
                    relative
                    flex w-full items-center
                    justify-between
                    gap-2
                    whitespace-nowrap
                    px-1 py-2
                    text-sm font-semibold
                    transition-colors duration-200
                    md:w-auto
                    ${isActive
                        ? "text-islamic-gold"
                        : "text-primary-dim hover:text-white"
                    }

                    after:absolute
                    after:bottom-0
                    after:left-0
                    after:h-[2px]
                    after:w-full
                    after:origin-left
                    after:bg-islamic-gold
                    after:transition-transform
                    after:duration-200

                    ${isActive
                        ? "after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100"
                    }
                `}
            >
                <span>{item.title}</span>

                <ChevronDown
                    className={`
                        h-4 w-4 shrink-0
                        transition-transform duration-200
                        ${submenuOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }
                    `}
                />
            </button>

            {/* =================================================
                DESKTOP DROPDOWN
            ================================================= */}

            <div
                className={`
                    absolute left-1/2 top-full z-50
                    hidden w-60
                    -translate-x-1/2
                    pt-3
                    md:block

                    ${submenuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }

                    transition-all duration-200 ease-out
                `}
            >
                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border border-white/10
                        bg-primary/98
                        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                        backdrop-blur-xl
                    "
                >
                    {/* Gold top border */}

                    <div className="h-0.5 w-full bg-islamic-gold" />

                    <div className="space-y-1 p-2">
                        {item.submenu?.map((subItem) => {
                            const active =
                                location.pathname ===
                                subItem.path;

                            return (
                                <NavLink
                                    key={subItem.path}
                                    to={subItem.path}
                                    onClick={() => setSubmenuOpen(false)}
                                    className={`
                                        group
                                        flex w-full
                                        items-center
                                        justify-between
                                        gap-3
                                        rounded-xl
                                        px-3.5 py-3
                                        text-sm
                                        transition-all duration-200
                                        ${active
                                            ? "bg-islamic-gold/15 text-islamic-gold"
                                            : "text-primary-dim hover:bg-white/10 hover:text-white"
                                        }
                                    `}
                                >
                                    <span className="whitespace-nowrap">
                                        {subItem.title}
                                    </span>

                                    <ChevronRight
                                        className={`
                                            h-3.5 w-3.5
                                            shrink-0
                                            opacity-70
                                            transition-all duration-200
                                            ${active ? "rotate-180 opacity-100" : ""}
                                            group-hover:rotate-180
                                            group-hover:translate-x-0.5
                                            group-hover:opacity-100
                                        `}
                                    />
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* =================================================
                MOBILE ACCORDION
            ================================================= */}

            <div
                className={`
                    overflow-hidden
                    md:hidden
                    ${submenuOpen
                        ? "mt-2 max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                    transition-all duration-300 ease-out
                `}
            >
                <div
                    className="
                        mx-auto
                        w-full
                        max-w-sm
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        p-2
                    "
                >
                    {item.submenu?.map((subItem) => {
                        const active =
                            location.pathname ===
                            subItem.path;

                        return (
                            <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() =>
                                    setSubmenuOpen(false)
                                }
                                className={`
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                    rounded-xl
                                    px-4 py-3
                                    text-sm
                                    transition-all duration-200

                                    ${active
                                        ? "bg-islamic-gold font-semibold text-primary"
                                        : "text-primary-dim hover:bg-white/10 hover:text-white"
                                    }
                                `}
                            >
                                <span className="whitespace-nowrap">
                                    {subItem.title}
                                </span>

                                <ChevronRight
                                    className={`
                                        h-4 w-4 shrink-0
                                        ${active
                                            ? "opacity-100"
                                            : "opacity-50"
                                        }
                                    `}
                                />
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </li>
    );
}

export default NavItem;