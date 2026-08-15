"use client";

import React, { useEffect, useRef, useState } from "react";
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
}

export function SpotlightNavbar({
    items = [
        { label: "Work", href: "#work" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "About", href: "#about" },
        { label: "Tech", href: "#tech" },
    ],
    className,
    onItemClick,
    defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
    const [hoverX, setHoverX] = useState<number | null>(null);

    // Refs for the "light" positions so we can animate them imperatively
    const spotlightX = useRef(0);
    const ambienceX = useRef(0);

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            // Direct update for immediate feedback (no spring for the mouse itself, feels snappier)
            spotlightX.current = x;
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
            // When mouse leaves, spring the spotlight back to the active item
            const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
            if (activeItem) {
                const navRect = nav.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const targetX = itemRect.left - navRect.left + itemRect.width / 2;

                gsap.to(spotlightX, {
                    current: targetX,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.6)",
                    onUpdate: () => {
                        nav.style.setProperty("--spotlight-x", `${spotlightX.current}px`);
                    }
                });
            }
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [activeIndex]);

    // Handle the "Ambience" (Active Item) Movement
    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;
        const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

        if (activeItem) {
            const navRect = nav.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();
            const targetX = itemRect.left - navRect.left + itemRect.width / 2;

            gsap.to(ambienceX, {
                current: targetX,
                duration: 0.6,
                ease: "elastic.out(1, 0.6)",
                onUpdate: () => {
                    nav.style.setProperty("--ambience-x", `${ambienceX.current}px`);
                },
            });
        }
    }, [activeIndex]);

    const handleItemClick = (item: NavItem, index: number) => {
        setActiveIndex(index);
        onItemClick?.(item, index);
    };

    return (
        <div className={cn("relative flex justify-center", className)}>
            <nav
                ref={navRef}
                className={cn(
                    "relative h-11 rounded-full transition-all duration-300 overflow-hidden",
                    "border border-white/10 bg-white/5 dark:bg-black/20 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                )}
            >
                {/* Content */}
                <ul className="relative flex items-center h-full px-1 sm:px-2 gap-0 z-[10] overflow-x-auto hide-scrollbar whitespace-nowrap w-full">
                    {items.map((item, idx) => (
                        <li key={idx} className="relative h-full flex items-center justify-center shrink-0">
                            <a
                                href={item.href}
                                data-index={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(item, idx);
                                    
                                    // Smooth scroll fallback if lenis/gsap is integrated site-wide
                                    const target = document.querySelector(item.href);
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className={cn(
                                    "px-3 sm:px-4 py-2 text-[11px] sm:text-[14px] font-body-md uppercase tracking-widest transition-colors duration-200 rounded-full",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                                    // Active vs Inactive Text
                                    activeIndex === idx
                                        ? "text-black dark:text-white"
                                        : "text-on-surface-variant/70 hover:text-on-surface"
                                )}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* LIGHTING LAYERS */}

                {/* 1. The Moving Spotlight (Follows Mouse) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] transition-opacity duration-300"
                    style={{
                        opacity: hoverX !== null ? 1 : 0,
                        background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(255,255,255,0.15)) 0%, 
                transparent 50%
              )
            `
                    }}
                />

                {/* 2. The Active State Ambience (Stays on Active) */}
                <div
                    className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
                    style={{
                        background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    var(--ambience-color, rgba(255,255,255,1)) 0%, 
                    transparent 100%
                  )
                `
                    }}
                />

            </nav>

            <style jsx>{`
        nav {
          --spotlight-color: rgba(255,255,255,0.15);
          --ambience-color: rgba(255,255,255,0.8);
        }
      `}</style>
        </div>
    );
}
