import type { ReactNode } from 'react';

interface SectionStageProps {
  id?: string;
  className?: string;
  enableFade?: boolean;
  children: ReactNode;
}

export function SectionStage({ id, className = '', enableFade = true, children }: SectionStageProps) {
  return (
    <div id={id} className={`lg:sticky lg:top-0 w-full relative ${className}`}>
      {enableFade && (
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-30" />
      )}
      {children}
    </div>
  );
}
