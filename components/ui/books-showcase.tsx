'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

import { BookCfg, BooksShowcaseProps } from './books-showcase/types';
import { createThreeEngine } from './books-showcase/engine';

export * from './books-showcase/types';

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const OPEN_BTN_OFF = ['opacity-0', 'scale-[0.94]'];
const OPEN_BTN_ON = ['opacity-100', 'scale-100'];

export function BooksShowcase({
  books = [],
  heroTitle = 'Books',
  navTitle = 'Bestsellers',
  showNav = true,
  showDetailPanel = true,
  showCarousel = true,
  themeColors,
  className,
  onBookSelect,
}: BooksShowcaseProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dpRef = useRef<HTMLDivElement | null>(null);
  const shiftCarouselRef = useRef<(dir: 1 | -1) => void>(() => { });

  const onBookSelectRef = useRef(onBookSelect);
  useEffect(() => {
    onBookSelectRef.current = onBookSelect;
  }, [onBookSelect]);

  const [uiMode, setUiMode] = useState<'hero' | 'opening' | 'detail' | 'closing'>('hero');
  const [selectedCfg, setSelectedCfg] = useState<BookCfg | null>(null);
  const [mounted, setMounted] = useState(false);

  // hero-word entrance: flip to `mounted` one frame after first paint so the
  // opacity/translate transition below actually has something to animate from.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvasEl = canvasRef.current;
    if (!root || !canvasEl || books.length === 0) return;

    const engine = createThreeEngine(
      canvasEl,
      root,
      dpRef,
      openBtnRef,
      closeBtnRef,
      books,
      showDetailPanel,
      setUiMode,
      setSelectedCfg,
      onBookSelectRef
    );

    shiftCarouselRef.current = engine.shiftCarousel;

    return engine.cleanup;
  }, [books, showDetailPanel]);

  const themeVars = {
    '--bs-navy': themeColors?.navy ?? '#141a32',
    '--bs-pink': themeColors?.pink ?? '#f591ac',
    '--bs-cream': themeColors?.cream ?? '#fdfbf4',
    '--bs-lav': themeColors?.lav ?? '#c9d0ee',
    '--bs-peri': themeColors?.peri ?? '#96a2de',
    '--bs-bg-light': themeColors?.bgLight ?? themeColors?.bg ?? '#fafafa',
    '--bs-bg-dark': themeColors?.bgDark ?? themeColors?.bg ?? '#18181b',
    '--bs-fg-light': themeColors?.foregroundLight ?? '#18181b',
    '--bs-fg-dark': themeColors?.foregroundDark ?? '#fafafa',
  } as React.CSSProperties;

  const panelVisible = uiMode === 'detail';
  const heroWordVisible = mounted && uiMode === 'hero';
  const canCarousel = showCarousel && books.length > 3;

  const delayMap: Record<number, string> = {
    50: 'delay-[50ms]',
    130: 'delay-[130ms]',
    210: 'delay-[210ms]',
    270: 'delay-[270ms]',
    330: 'delay-[330ms]',
  };

  const dpChild = (delayMs: number) =>
    panelVisible
      ? `opacity-100 translate-y-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${delayMap[delayMs] || ''}`
      : 'opacity-0 translate-y-[28px] transition-[opacity,transform] duration-[280ms] ease-out';

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label={`${heroTitle} book showcase`}
      data-state={uiMode}
      className={cn(
        'book-showcase relative isolate h-full min-h-[560px] overflow-hidden font-sans outline-none [container-type:size] [-webkit-tap-highlight-color:transparent]',
        'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--bs-peri)]',
        'transition-colors duration-500 ease-out',
        uiMode === 'hero'
          ? 'bg-[var(--bs-bg-light)] text-[var(--bs-fg-light)] dark:bg-[var(--bs-bg-dark)] dark:text-[var(--bs-fg-dark)]'
          : 'bg-[var(--bs-navy)] text-[var(--bs-cream)]',
        className,
      )}
      style={themeVars}
    >
      {/* hero word */}
      <div
        className={`pointer-events-none absolute left-1/2 top-[18%] z-[1] -translate-x-1/2 select-none transition-all duration-500 ease-out ${heroWordVisible ? 'translate-y-0 opacity-100' : uiMode === 'hero' ? '-translate-y-0 translate-y-[60px] opacity-0' : '-translate-y-11 opacity-0'
          }`}
      >
        <span className="block whitespace-nowrap text-current text-[clamp(4.5rem,22.5cqw,18rem)] font-extrabold leading-[0.85] tracking-[-0.015em]">
          {heroTitle}
        </span>
      </div>

      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-[2] block h-full w-full touch-none" />

      {books.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 text-center text-sm text-current opacity-60">
          Add at least one book to display the showcase.
        </div>
      )}

      {showNav && (
        <nav
          aria-hidden={uiMode !== 'hero'}
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(20px,4cqw,42px)] py-[clamp(18px,3cqh,26px)] transition-opacity duration-300',
            uiMode === 'hero' ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="text-[clamp(20px,2.2cqw,29px)] font-extrabold tracking-[-0.01em] text-current">
            {navTitle}
          </div>
        </nav>
      )}

      {canCarousel && (
        <>
          <button
            type="button"
            aria-label="Previous books"
            onClick={() => shiftCarouselRef.current(-1)}
            className={`absolute left-3 top-1/2 z-30 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bs-cream)]/90 text-[var(--bs-navy)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--bs-cream)] @min-[768px]:left-6 @min-[768px]:h-12 @min-[768px]:w-12 ${uiMode === 'hero' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next books"
            onClick={() => shiftCarouselRef.current(1)}
            className={`absolute right-3 top-1/2 z-30 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bs-cream)]/90 text-[var(--bs-navy)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--bs-cream)] @min-[768px]:right-6 @min-[768px]:h-12 @min-[768px]:w-12 ${uiMode === 'hero' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* trailing "open" slip — position is driven by the animation loop via inline style */}
      <button
        ref={openBtnRef}
        tabIndex={-1}
        aria-hidden="true"
        className={
          'absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2 rotate-[-1.6deg] px-[38px] pb-[18px] pt-4 ' +
          'text-[15px] font-bold uppercase tracking-[0.1em] text-[var(--bs-navy)] pointer-events-none ' +
          'transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[left,top,opacity,transform] ' +
          '[clip-path:polygon(0%_0.9%,8.3%_0.8%,16.7%_6.3%,25%_3.8%,33.3%_5.5%,41.7%_2.7%,50%_5.2%,58.3%_0.4%,66.7%_5.9%,75%_6.5%,83.3%_1%,91.7%_6.4%,100%_0.7%,97.7%_20%,97%_40%,99.6%_60%,98.7%_80%,100%_96.5%,91.7%_99.8%,83.3%_95.6%,75%_94.9%,66.7%_96.6%,58.3%_93.5%,50%_97.9%,41.7%_99.5%,33.3%_93.2%,25%_93.6%,16.7%_93.2%,8.3%_93.1%,0%_93.5%,0.2%_80%,1.1%_60%,3.9%_40%,3.8%_20%)] ' +
          '[background:repeating-linear-gradient(92deg,rgba(90,74,40,0.03)_0px_2px,transparent_2px_6px),radial-gradient(125%_150%_at_28%_0%,#fffdf7_0%,#f8f2e3_58%,#ede4cf_100%)] ' +
          '[filter:drop-shadow(0_2px_1px_rgba(0,0,0,0.16))_drop-shadow(0_14px_26px_rgba(0,0,0,0.4))] ' +
          OPEN_BTN_OFF.join(' ')
        }
      >
        Open
      </button>

      <button
        ref={closeBtnRef}
        aria-label="Close detail view"
        className={`absolute left-1/2 top-[30px] z-40 -translate-x-1/2 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-[var(--bs-cream)]/40 bg-transparent text-[17px] leading-none text-[var(--bs-cream)] transition-[opacity,border-color] duration-300 delay-150 hover:border-[var(--bs-cream)]/90 @max-[760px]:left-auto @max-[760px]:right-[18px] @max-[760px]:top-[18px] @max-[760px]:translate-x-0 [-webkit-tap-highlight-color:transparent] ${uiMode === 'detail' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
      >
        &#10005;
      </button>

      {showDetailPanel && (
        <div
          ref={dpRef}
          aria-live="polite"
          className={`absolute right-[7%] top-1/2 z-[15] w-[min(560px,42%)] -translate-y-1/2 pointer-events-none @max-[760px]:right-auto @max-[760px]:left-1/2 @max-[760px]:top-auto @max-[760px]:bottom-[3.5%] @max-[760px]:w-[min(560px,92cqw)] @max-[760px]:-translate-x-1/2 @max-[760px]:translate-y-0 ${panelVisible ? 'visible' : 'invisible delay-[500ms]'
            }`}
        >
          <h1 className={`m-0 text-[var(--bs-pink)] text-[clamp(52px,5.6cqw,92px)] font-extrabold leading-[0.98] tracking-[-0.015em] @max-[760px]:text-[clamp(36px,9.5cqw,54px)] ${dpChild(50)}`}>
            {selectedCfg?.title}
          </h1>
          <p className={`mt-[26px] max-w-[54ch] text-[var(--bs-lav)] text-[clamp(16px,1.25cqw,19px)] leading-[1.65] @max-[760px]:mt-4 @max-[760px]:line-clamp-4 @max-[760px]:text-[15px] ${dpChild(130)}`}>
            {selectedCfg?.desc}
          </p>
          <div className={`mt-[34px] flex items-center gap-[18px] @max-[760px]:mt-[18px] ${dpChild(210)}`}>
            <div className="text-2xl font-bold text-[var(--bs-pink)]">
               {selectedCfg?.metricValue}
            </div>
            <div className="h-6 w-px bg-[var(--bs-lav)]/[0.28]" />
            <div className="text-[14px] uppercase tracking-widest font-mono text-[#98a4d6]">{selectedCfg?.metricLabel}</div>
            <div className="ml-auto flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {selectedCfg?.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 border border-[var(--bs-lav)]/30 rounded-full text-xs text-[var(--bs-cream)] whitespace-nowrap">{tag}</span>
              ))}
            </div>
          </div>
          <div className={`mt-[26px] border-t border-[var(--bs-lav)]/[0.18] @max-[760px]:mt-4 ${dpChild(270)}`} />
          <div
            className={`pointer-events-auto mt-8 inline-flex items-center gap-[10px] rounded-full bg-[#1a2140] p-[10px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] @max-[760px]:mt-[18px] @max-[760px]:flex-wrap @max-[760px]:rounded-[28px] ${dpChild(330)}`}
          >
            <button className="inline-flex h-[54px] items-center gap-[10px] rounded-full bg-[var(--bs-cream)] px-[26px] text-[16.5px] font-semibold text-[var(--bs-navy)] transition-[transform,filter] duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:brightness-105 @max-[760px]:h-12 @max-[760px]:px-5 @max-[760px]:text-[15px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.8 2.6 2.8 15.4 0 18M12 3c-2.8 2.6-2.8 15.4 0 18" />
              </svg>
              <span>English</span>
            </button>
            <button className="inline-flex h-[54px] items-center gap-[10px] rounded-full bg-[var(--bs-peri)] px-[26px] text-[16.5px] font-semibold text-[#10152c] transition-[transform,filter] duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:brightness-105 @max-[760px]:h-12 @max-[760px]:px-5 @max-[760px]:text-[15px]">
              Buy Now
            </button>
            <button className="inline-flex h-[54px] items-center gap-[10px] rounded-full bg-[var(--bs-peri)] px-[26px] text-[16.5px] font-semibold text-[#10152c] transition-[transform,filter] duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:brightness-105 @max-[760px]:h-12 @max-[760px]:px-5 @max-[760px]:text-[15px]">
              Buy Audiobook
            </button>
            <button
              aria-label="Save"
              className="inline-flex h-[54px] w-[54px] items-center justify-center gap-[10px] rounded-full bg-[#242c50] px-0 text-[var(--bs-lav)] transition-[transform,filter] duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04] hover:brightness-105"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5">
                <path d="M7 3h10v18l-5-4-5 4z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BooksShowcase;
