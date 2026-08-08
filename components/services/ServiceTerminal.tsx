'use client';

import type { ServiceSlide } from '@/components/services/data';

interface ServiceTerminalProps {
  active: ServiceSlide;
  snippets: string[];
  visibleLines: number;
  visibleFacilities: number;
  expanded: boolean;
  themeColor: string;
  setExpanded: (value: boolean) => void;
}

export function ServiceTerminal({
  active,
  snippets,
  visibleLines,
  visibleFacilities,
  expanded,
  themeColor,
  setExpanded,
}: ServiceTerminalProps) {
  return (
    <div className="relative rounded-[24px] border border-white/10 bg-[#08080a]/50 backdrop-blur-md p-5 sm:p-6 flex-1 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-auto font-mono text-[8px] text-white/30 uppercase tracking-wider">
          {expanded ? `${active.title.toLowerCase()} // deliverables` : `${active.title.toLowerCase()}.tsx`}
        </span>
      </div>

      {!expanded ? (
        <div className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed">
          {snippets.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="svc-code-line flex gap-3" style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
              <span className="text-white/15 select-none w-5 text-right shrink-0">{i + 1}</span>
              <span className="text-white/50 whitespace-pre">{line}</span>
            </div>
          ))}
          {visibleLines < snippets.length && (
            <div className="flex gap-3">
              <span className="text-white/15 select-none w-5 text-right shrink-0">{visibleLines + 1}</span>
              <span className="inline-block w-[7px] h-[14px] bg-white/50 animate-pulse" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold mb-1">
            {active.title} // WHAT YOU GET
          </span>
          {active.facilities.slice(0, visibleFacilities).map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group/fac"
              style={{ animation: 'fadeSlideIn 0.35s ease-out' }}
            >
              <span
                className="shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[9px] font-bold border"
                style={{
                  color: themeColor,
                  borderColor: `${themeColor}25`,
                  backgroundColor: `${themeColor}08`,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[12px] text-white/55 leading-relaxed pt-0.5 group-hover/fac:text-white/80 transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
