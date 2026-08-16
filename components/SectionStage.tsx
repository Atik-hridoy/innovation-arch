import type { ReactNode } from 'react';

interface SectionStageProps {
  id?: string;
  className?: string;
  enableFade?: boolean;
  children: ReactNode;
}

export function SectionStage({ id, className = '', enableFade = false, children }: SectionStageProps) {
  return (
    <div id={id} className={`w-full relative ${className}`}>
      {enableFade && (
        <div className="hidden sm:block absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-30 transition-colors duration-400" />
      )}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

