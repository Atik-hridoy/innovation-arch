'use client';

import type { TechNode } from '@/components/tech/data';

interface TechNodeCardProps {
  node: TechNode;
  isSelected: boolean;
  onSelect: () => void;
}

export function TechNodeCard({ node, isSelected, onSelect }: TechNodeCardProps) {
  return (
    <div
      onMouseEnter={onSelect}
      onClick={onSelect}
      className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl group ${isSelected
          ? 'border-primary bg-primary/15 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-105'
          : 'border-white/10 bg-[#0a0a10]/80 hover:border-white/25 hover:bg-white/[0.04]'
        }`}
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-110 transition-transform">
          <img src={node.logo} alt={node.title} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans font-extrabold text-sm text-white tracking-tight">{node.title}</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 font-semibold">{node.badge}</span>
        </div>
      </div>

      <span
        className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-widest"
        style={{ backgroundColor: `${node.color}20`, color: node.color, borderColor: `${node.color}40` }}
      >
        {node.metric}
      </span>
    </div>
  );
}
