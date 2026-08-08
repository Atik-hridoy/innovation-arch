'use client';

import type { ProcessStep } from '@/components/process/data.tsx';

interface ProcessStepCardProps {
  step: ProcessStep;
  isActive: boolean;
  onHover: () => void;
  onBlur: () => void;
}

export function ProcessStepCard({ step, isActive, onHover, onBlur }: ProcessStepCardProps) {
  return (
    <div
      className="absolute flex flex-col items-center z-30 group"
      style={{
        left: step.desktopPosition.left,
        top: step.desktopPosition.top,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
    >
      <div className={`absolute -inset-4 rounded-full bg-primary/10 blur-md transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100 scale-125' : 'opacity-0'}`} />

      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer relative z-10 ${isActive
          ? 'bg-primary/20 border-2 border-primary shadow-[0_0_20px_rgba(221,183,255,0.4)] scale-115'
          : 'bg-white/5 border border-white/10 hover:border-primary/40'
        }`}
      >
        {step.icon}
      </div>

      <div className={`absolute top-full mt-4 w-52 flex flex-col items-center text-center transition-all duration-500 pointer-events-none ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-70 translate-y-1 scale-95'}`}>
        <div className="text-[10px] text-primary uppercase font-mono tracking-widest font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-2">
          {step.id} / {step.name}
        </div>
        <h4 className="text-xs font-semibold text-white tracking-wide">{step.title}</h4>
        <p className="text-[10px] text-on-surface-variant/80 mt-1 leading-relaxed max-w-[180px]">
          {step.description}
        </p>
      </div>
    </div>
  );
}
