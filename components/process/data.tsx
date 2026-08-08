'use client';

import type { ReactNode } from 'react';

function DiscoverIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" className="stroke-primary/20" />
      <circle cx="12" cy="12" r="5" className="stroke-primary/40" />
      <circle cx="12" cy="12" r="2" className="fill-primary stroke-none" />
      <line x1="12" y1="12" x2="18" y2="6" className="stroke-primary origin-center animate-[spin_4s_linear_infinite]" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 4 20 L 12 4 L 20 20" className="stroke-white/10" strokeDasharray="2 2" />
      <path d="M 4 20 Q 12 4 20 20" className="stroke-primary" strokeWidth="2" />
      <rect x="2" y="18" width="4" height="4" className="fill-background stroke-primary" strokeWidth="1.5" />
      <rect x="18" y="18" width="4" height="4" className="fill-background stroke-primary" strokeWidth="1.5" />
      <circle cx="12" cy="4" r="3" className="fill-primary stroke-none" />
    </svg>
  );
}

function DevelopIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 8 6 L 3 12 L 8 18" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 6 L 21 12 L 16 18" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" className="stroke-primary/60" strokeWidth="1.5" />
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2S8 7 8 12v3l4 3 4-3v-3c0-5-4-10-4-10z" className="stroke-primary" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
      <path d="M8 15l-4 2v-3l4-1" className="stroke-primary" />
      <path d="M16 15l4 2v-3l-4-1" className="stroke-primary" />
      <path d="M12 18v4" className="stroke-[#adc6ff] animate-bounce" strokeWidth="2" />
      <path d="M10 19v2" className="stroke-[#842bd2] animate-pulse" />
      <path d="M14 19v2" className="stroke-[#842bd2] animate-pulse" />
    </svg>
  );
}

function GrowIcon() {
  return (
    <svg className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M 3 21 L 21 21" className="stroke-white/10" />
      <path d="M 3 21 L 3 3" className="stroke-white/10" />
      <path d="M 3 18 Q 10 16 14 10 T 21 3" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="3" r="3" className="fill-primary animate-ping" />
      <circle cx="21" cy="3" r="2" className="fill-primary stroke-none" />
    </svg>
  );
}

export interface ProcessStep {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: ReactNode;
  desktopPosition: { left: string; top: string };
}

export const steps: ProcessStep[] = [
  {
    id: '01',
    name: 'DISCOVER',
    title: 'Insight Gathering & Strategy',
    description: 'We dive deep into your product vision, target market, and technical constraints to outline a high-impact roadmap.',
    icon: <DiscoverIcon />,
    desktopPosition: { left: '8%', top: '20%' },
  },
  {
    id: '02',
    name: 'DESIGN',
    title: 'Premium UI/UX Architecture',
    description: 'We wireframe, prototype, and build immersive high-fidelity user experiences that communicate luxury and precision.',
    icon: <DesignIcon />,
    desktopPosition: { left: '29%', top: '65%' },
  },
  {
    id: '03',
    name: 'DEVELOP',
    title: 'High-Performance Engineering',
    description: 'We engineer modular, robust, and lightning-fast software systems optimized for scalability and clean code.',
    icon: <DevelopIcon />,
    desktopPosition: { left: '50%', top: '20%' },
  },
  {
    id: '04',
    name: 'LAUNCH',
    title: 'Seamless Product Deployment',
    description: 'We perform strict quality control, optimize assets, and orchestrate smooth deployments to production servers.',
    icon: <LaunchIcon />,
    desktopPosition: { left: '71%', top: '65%' },
  },
  {
    id: '05',
    name: 'GROW',
    title: 'Optimization & Scaling',
    description: 'We analyze user engagement, scale system capacity, automate processes, and implement modern growth features.',
    icon: <GrowIcon />,
    desktopPosition: { left: '92%', top: '20%' },
  },
];
