"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface NavItem {
    label: string;
    href: string;
}

export interface SpotlightNavbarProps {
    items?: NavItem[];
    className?: string;
    onItemClick?: (item: NavItem, index: number) => void;
    defaultActiveIndex?: number;
    activeIndex?: number;
}

export function SpotlightNavbar({
    items = [
        { label: "Overview", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "Work", href: "#work" },
        { label: "Tech", href: "#tech" },
        { label: "Contact", href: "#contact" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
    activeIndex: controlledActiveIndex,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const activePillRef = useRef<HTMLDivElement>(null);
    const [localActiveIndex, setLocalActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);

    const activeIndex = controlledActiveIndex !== undefined ? controlledActiveIndex : localActiveIndex;

    const updatePillPosition = useCallback((targetIndex: number, animate = true) => {
        if (!navRef.current || !activePillRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${targetIndex}"]`) as HTMLElement;

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetLeft = itemRect.left - navRect.left;
            const targetWidth = itemRect.width;
            const targetCenterX = targetLeft + targetWidth / 2;

            if (animate) {
                gsap.to(activePillRef.current, {
                    x: targetLeft,
                    width: targetWidth,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto",
                });
                gsap.to(nav, {
                    "--ambience-x": `${targetCenterX}px`,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            } else {
                gsap.set(activePillRef.current, {
                    x: targetLeft,
                    width: targetWidth,
                });
                nav.style.setProperty("--ambience-x", `${targetCenterX}px`);
            }
        }
    }, []);

    // Animate active sliding pill & lighting indicator when activeIndex changes
    useEffect(() => {
        updatePillPosition(activeIndex, true);
    }, [activeIndex, updatePillPosition]);

    // Handle initial render & font load alignment
    useEffect(() => {
        const timer1 = setTimeout(() => updatePillPosition(activeIndex, false), 50);
        const timer2 = setTimeout(() => updatePillPosition(activeIndex, false), 300);

        const handleResize = () => updatePillPosition(activeIndex, false);
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            window.removeEventListener("resize", handleResize);
        };
    }, [activeIndex, updatePillPosition]);

    // Mouse movement spotlight
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const handleItemClick = (item: NavItem, index: number) => {
        setLocalActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "relative h-12 rounded-full transition-all duration-300 overflow-hidden px-1.5 flex items-center",
                    "border border-emerald-500/25 dark:border-white/12 bg-emerald-950/80 dark:bg-[#070709]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                )}
            >
                {/* 🌟 Animated Sliding Active Pill Background 🌟 */}
                <div
                    ref={activePillRef}
                    className="absolute top-1 bottom-1 left-0 rounded-full bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-emerald-500/25 dark:from-emerald-500/30 dark:via-teal-500/25 dark:to-emerald-500/30 border border-emerald-400/50 dark:border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.35)] dark:shadow-[0_0_20px_rgba(52,211,153,0.35)] pointer-events-none z-[5] will-change-transform"
                />

                {/* Nav Items List */}
                <ul className="relative flex items-center h-full gap-1 z-[10] whitespace-nowrap w-full">
                    {items.map((item, idx) => {
                        const isActive = activeIndex === idx;
                        return (
                            <li key={idx} className="relative h-full flex items-center justify-center shrink-0">
                                <a
                                    href={item.href}
                                    data-index={idx}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleItemClick(item, idx);
                                        const target = document.querySelector(item.href);
                                        if (target) {
                                            target.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                    className={cn(
                                        "relative px-4 py-2 text-[11px] sm:text-[12.5px] font-mono uppercase tracking-[0.14em] transition-all duration-300 rounded-full select-none cursor-pointer flex items-center gap-1.5",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                                        isActive
                                            ? "text-white font-black drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                                            : "text-emerald-100/65 dark:text-white/55 hover:text-white dark:hover:text-white font-semibold"
                                    )}
                                >
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-primary animate-pulse shrink-0" />
                                    )}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Moving Spotlight (Mouse interaction) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
                            radial-gradient(
                                130px circle at var(--spotlight-x) 100%, 
                                var(--spotlight-color, rgba(52,211,153,0.25)) 0%, 
                                transparent 60%
                            )
                        `,
                    }}
                />

                {/* Active Section Bottom Neon Glow Line */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[3px] z-[2]"
                    style={{
                        background: `
                            radial-gradient(
                                80px circle at var(--ambience-x, 50%) 0%, 
                                var(--ambience-color, rgba(52,211,153,1)) 0%, 
                                transparent 100%
                            )
                        `,
                    }}
                />
            </nav>

            <style jsx>{`
                nav {
                    --spotlight-color: rgba(52, 211, 153, 0.25);
                    --ambience-color: rgba(52, 211, 153, 1);
                }
                :global(.dark) nav {
                    --spotlight-color: rgba(52, 211, 153, 0.25);
                    --ambience-color: rgba(52, 211, 153, 1);
                }
            `}</style>
        </div>
    );
}

export default SpotlightNavbar;
