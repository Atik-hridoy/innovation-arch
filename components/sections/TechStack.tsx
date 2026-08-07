'use client';

import { useState } from 'react';
import { Logo } from '@/components/Logo';

interface TechNode {
  id: string;
  title: string;
  badge: string;
  logo: string;
  color: string;
  side: 'left' | 'right';
  metric: string;
  desc: string;
}

const NODES: TechNode[] = [
  // Left Side (Frontend / Web UI / App Stack)
  {
    id: '01',
    title: 'Next.js 16',
    badge: 'Frontend Core',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#a855f7',
    side: 'left',
    metric: 'WEB / APP',
    desc: 'React 19 Server Components, SSR & App Router architecture.',
  },
  {
    id: '02',
    title: 'TypeScript',
    badge: 'UI DX / Architecture',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3b82f6',
    side: 'left',
    metric: 'STRICT DX',
    desc: 'End-to-end type safety across UI components & API contracts.',
  },
  {
    id: '03',
    title: 'Tailwind CSS',
    badge: 'Design System',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06b6d4',
    side: 'left',
    metric: 'OBSIDIAN UI',
    desc: 'Custom design tokens & responsive luxury Web/App layout engine.',
  },
  {
    id: '04',
    title: 'GSAP & Three.js',
    badge: 'UI Motion & 3D',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#84cc16',
    side: 'left',
    metric: '60 FPS 3D',
    desc: 'ScrollTrigger motion reveals, WebGL GLSL shaders & fluid micro-interactions.',
  },

  // Right Side (Backend / AI Agent / Cloud Infrastructure)
  {
    id: '05',
    title: 'PyTorch & LangChain',
    badge: 'AI Agent Core',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    color: '#ee4c2c',
    side: 'right',
    metric: 'AI AGENTS',
    desc: 'Autonomous agent reasoning, vector embeddings & neural inference.',
  },
  {
    id: '06',
    title: 'Node.js & Python',
    badge: 'Backend Services',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#22c55e',
    side: 'right',
    metric: 'MICROSERVICES',
    desc: 'High-concurrency event loops, GraphQL schema federation & REST APIs.',
  },
  {
    id: '07',
    title: 'PostgreSQL / Vector DB',
    badge: 'Data & RAG Storage',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#38bdf8',
    side: 'right',
    metric: 'VECTOR DB',
    desc: 'High-speed relational data, pgvector embeddings & real-time sync.',
  },
  {
    id: '08',
    title: 'Vercel & AWS Cloud',
    badge: 'Cloud Edge Infra',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    color: '#e879f9',
    side: 'right',
    metric: 'GLOBAL EDGE',
    desc: 'Zero-downtime CI/CD deployment, serverless edge functions & global CDN.',
  },
];

export function TechStack() {
  const [activeTab, setActiveTab] = useState<'WEB' | 'APP' | 'AI'>('WEB');
  const [activeNode, setActiveNode] = useState<TechNode | null>(null);

  const STACK_PRESETS = {
    WEB: {
      left: [
        { id: 'w1', title: 'Next.js 16', badge: 'Fullstack React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#a855f7', metric: 'SSR / 100', desc: 'React 19 Server Components, SSR & Turbopack bundler.' },
        { id: 'w2', title: 'TypeScript', badge: 'Architecture', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3b82f6', metric: 'STRICT', desc: 'Strict end-to-end typing for components and endpoints.' },
        { id: 'w3', title: 'Tailwind CSS', badge: 'Design System', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4', metric: 'TOKENS', desc: 'Custom tokens & obsidian dark mode aesthetic.' },
        { id: 'w4', title: 'GSAP Motion', badge: 'Animation', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#84cc16', metric: '60 FPS', desc: 'ScrollTrigger motion reveals & SVG path drawing.' },
      ],
      right: [
        { id: 'w5', title: 'Three.js / WebGL', badge: '3D Shaders', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', color: '#c084fc', metric: 'GPU 3D', desc: 'Custom GLSL shaders & particle rendering.' },
        { id: 'w6', title: 'Node.js API', badge: 'Backend Services', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#22c55e', metric: 'ASYNC IO', desc: 'High-concurrency GraphQL and REST microservices.' },
        { id: 'w7', title: 'PostgreSQL DB', badge: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#38bdf8', metric: 'RELATIONAL', desc: 'ACID transactions & real-time sync engines.' },
        { id: 'w8', title: 'Vercel Edge', badge: 'Cloud Infra', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#e879f9', metric: 'GLOBAL CDN', desc: 'Zero-downtime serverless edge deployments.' },
      ],
    },
    APP: {
      left: [
        { id: 'a1', title: 'React Native', badge: 'Cross-Platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb', metric: 'IOS / ANDROID', desc: 'Native compiled mobile apps with shared logic.' },
        { id: 'a2', title: 'Expo Framework', badge: 'Mobile Ecosystem', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#a855f7', metric: 'OTA UPDATES', desc: 'Instant over-the-air updates & native modules.' },
        { id: 'a3', title: 'Reanimated 3', badge: 'Native Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f59e0b', metric: '120 FPS UI', desc: 'UI thread gesture handlers & fluid mobile motion.' },
        { id: 'a4', title: 'Tailwind / NativeWind', badge: 'Mobile Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4', metric: 'UNIFIED UI', desc: 'Shared style tokens across Web and Mobile UI.' },
      ],
      right: [
        { id: 'a5', title: 'Swift / Kotlin', badge: 'Native Bridge', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', color: '#f97316', metric: 'NATIVE SPEED', desc: 'Hardware camera, biometrics & Bluetooth APIs.' },
        { id: 'a6', title: 'Firebase / Supabase', badge: 'Mobile Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#ffca28', metric: 'REALTIME', desc: 'Push notifications, auth & offline data caching.' },
        { id: 'a7', title: 'GraphQL / REST', badge: 'App Sync', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#e10098', metric: 'LOW LATENCY', desc: 'Optimized Mobile data query bandwidth.' },
        { id: 'a8', title: 'App Store / Play', badge: 'Deployment', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg', color: '#ffffff', metric: 'PUBLISHED', desc: 'Automated CI/CD App store submission pipelines.' },
      ],
    },
    AI: {
      left: [
        { id: 'ai1', title: 'PyTorch / Python', badge: 'Neural Engine', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#ee4c2c', metric: 'DEEP LEARNING', desc: 'Custom model training & neural network pipelines.' },
        { id: 'ai2', title: 'LangChain & LlamaIndex', badge: 'Agent Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776ab', metric: 'LLM RAG', desc: 'Autonomous agent reasoning & tool calling pipelines.' },
        { id: 'ai3', title: 'OpenAI & Gemini API', badge: 'Foundation Models', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', color: '#4285f4', metric: 'AGENT REASON', desc: 'Multi-modal LLM intelligence & fine-tuning.' },
        { id: 'ai4', title: 'FastAPI / Python', badge: 'AI Microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: '#059669', metric: 'HIGH SPEED', desc: 'Asynchronous streaming endpoints for AI agents.' },
      ],
      right: [
        { id: 'ai5', title: 'Pinecone / PgVector', badge: 'Vector Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#38bdf8', metric: 'EMBEDDINGS', desc: 'Sub-millisecond semantic search & memory stores.' },
        { id: 'ai6', title: 'Docker & Kubernetes', badge: 'GPU Container', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed', metric: 'ORCHESTRATED', desc: 'Scalable GPU container clusters & serverless AI.' },
        { id: 'ai7', title: 'Redis Cache', badge: 'Agent Memory', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#dc2626', metric: 'FAST MEMORY', desc: 'Real-time conversation memory & rate limiting.' },
        { id: 'ai8', title: 'AWS EC2 / Modal', badge: 'GPU Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#ff9900', metric: 'GPU COMPUTE', desc: 'Dedicated H100/A100 inference infrastructure.' },
      ],
    },
  };

  const currentPreset = STACK_PRESETS[activeTab];

  return (
    <section id="tech" className="relative py-16 md:py-stack-xl px-4 sm:px-margin-edge z-10 bg-[#040407] overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* ━━━ Dotted World Map Background Image (User Specified Asset) ━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-40">
        <img
          src="/images/World Map illustration with dotted effect on dark isolated background.jpg"
          alt="World Map Grid"
          className="w-full h-full max-w-6xl max-h-[600px] object-contain filter contrast-125"
          style={{
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary/80 font-bold">
            // ARCHITECTURAL TECH PIPELINE
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.95]">
            Engineering Neural Architecture
          </h2>
          <p className="font-mono text-xs md:text-sm text-white/50 leading-relaxed max-w-xl">
            Switch between Web App, Mobile App, and AI Agent presets to inspect our specialized technology stack.
          </p>

          {/* Interactive Preset Selector Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md mt-2">
            {[
              { key: 'WEB', label: '🌐 WEB PLATFORM' },
              { key: 'APP', label: '📱 MOBILE APP' },
              { key: 'AI', label: '🤖 AI AGENTS' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setActiveNode(null);
                }}
                className={`px-4 py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${activeTab === tab.key
                    ? 'bg-primary/25 border border-primary/50 text-primary shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-105'
                    : 'text-white/40 hover:text-white/80 border border-transparent'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ━━━ MOBILE ONLY: Funnel Integration Architecture (Flipped - Product on Top, Grid on Bottom) ━━━ */}
        <div className="lg:hidden flex flex-col items-center w-full relative py-2">

          {/* Top Product Hub Box */}
          <div className="w-full max-w-xs mx-auto rounded-3xl border border-primary/40 bg-[#0c0a18]/95 backdrop-blur-2xl p-5 flex flex-col gap-3 shadow-[0_20px_50px_rgba(132,43,210,0.3)] mb-1 text-left">
            {/* Top Micro Tech Badges Row */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 overflow-x-auto no-scrollbar">
              {['Next.js 16', 'TypeScript', 'PyTorch AI', 'Vector DB'].map((badge, bIdx) => (
                <span key={bIdx} className="font-mono text-[8px] font-bold text-primary/90 bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shrink-0">
                  {badge}
                </span>
              ))}
            </div>

            {/* Central Product Hub Block */}
            <div className="flex items-center gap-3.5 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary p-2.5 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Logo showText={false} className="w-full h-full text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold">
                  STUDIO ARCHITECTURE
                </span>
                <h4 className="font-sans font-extrabold text-base text-white tracking-tight leading-tight">
                  Your AI Product
                </h4>
              </div>
            </div>
          </div>

          {/* SVG Curved Funnel Connector Paths (Flipped Downward) */}
          <div className="w-full h-24 relative overflow-visible my-1 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 320 90" fill="none">
              <path d="M 160 0 C 160 40, 30 40, 30 90" stroke="rgba(168,85,247,0.5)" strokeWidth="2" />
              <path d="M 160 0 C 160 45, 95 45, 95 90" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
              <path d="M 160 0 L 160 90" stroke="rgba(132,43,210,0.8)" strokeWidth="2.5" />
              <path d="M 160 0 C 160 45, 225 45, 225 90" stroke="rgba(34,197,94,0.5)" strokeWidth="2" />
              <path d="M 160 0 C 160 40, 290 40, 290 90" stroke="rgba(238,76,44,0.5)" strokeWidth="2" />

              {/* Static energy particles along downward funnel streams (No Motion / Ping) */}
              <circle cx="95" cy="70" r="3" fill="#a855f7" className="opacity-90" />
              <circle cx="160" cy="45" r="3.5" fill="#c084fc" className="opacity-90" />
              <circle cx="225" cy="70" r="3" fill="#22c55e" className="opacity-90" />
            </svg>
          </div>

          {/* Bottom 3x5 Grid of Tech Icon Nodes */}
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 w-full max-w-sm mx-auto justify-items-center mt-6">
            {[
              { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
              { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
              { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
              { name: 'GSAP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { name: 'Three.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },

              { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
              { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
              { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },

              { name: 'Postgres', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
              { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
              { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
              { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/10 bg-[#0e0c1a]/90 backdrop-blur-xl flex items-center justify-center p-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
              >
                <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

        </div>

        {/* ━━━ DESKTOP ONLY: Central Hub System Integration Graph ━━━ */}
        <div className="hidden lg:flex w-full relative flex-row items-center justify-between gap-0 py-4 min-h-[520px]">

          {/* Left Column Nodes */}
          <div className="flex flex-col gap-6 w-72 relative z-20">
            {currentPreset.left.map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node as any)}
                  onClick={() => setActiveNode(node as any)}
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
                      <span className="font-sans font-extrabold text-sm text-white tracking-tight">
                        {node.title}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 font-semibold">
                        {node.badge}
                      </span>
                    </div>
                  </div>

                  {/* Metric Pill */}
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest"
                    style={{ backgroundColor: `${node.color}20`, color: node.color, borderColor: `${node.color}40` }}
                  >
                    {node.metric}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SVG Multi-Colored Connection Lines (Extended Directly into Card Borders) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 520" fill="none">
              {/* Left Column Connectors (Directly Touches Left Cards at X:300 to Center Hub Rim at X:380) */}
              <path d="M 300 64 C 345 64, 355 260, 380 260" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="5 5" className="opacity-80" />
              <path d="M 300 184 C 345 184, 355 260, 380 260" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="5 5" className="opacity-80" />
              <path d="M 300 304 C 345 304, 355 260, 380 260" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="5 5" className="opacity-80" />
              <path d="M 300 424 C 345 424, 355 260, 380 260" stroke="#84cc16" strokeWidth="2.5" strokeDasharray="5 5" className="opacity-80" />

              {/* Right Column Connectors (Directly Touches Center Hub Rim at X:620 to Right Cards at X:700) */}
              <path d="M 620 260 C 645 260, 655 64, 700 64" stroke="#ee4c2c" strokeWidth="2.5" />
              <path d="M 620 260 C 645 260, 655 184, 700 184" stroke="#22c55e" strokeWidth="2.5" />
              <path d="M 620 260 C 645 260, 655 304, 700 304" stroke="#38bdf8" strokeWidth="2.5" />
              <path d="M 620 260 C 645 260, 655 424, 700 424" stroke="#e879f9" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Central Neural Hub Node (Restored Architectural Circle Layout - No Blinking) */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full border border-primary/40 bg-[#0a0714]/90 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 z-20 shadow-[0_0_70px_rgba(168,85,247,0.35)] shrink-0 my-4 lg:my-0 group cursor-pointer">
            {/* Smooth Concentric Rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 opacity-40 pointer-events-none" />
            <div className="absolute -inset-4 rounded-full border border-secondary/15 opacity-30 pointer-events-none" />
            <div className="absolute -inset-8 rounded-full border border-white/5 opacity-20 pointer-events-none" />

            {/* Center Core Brand Badge */}
            <div className="w-16 h-16 rounded-full border border-primary/50 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
              <span className="font-sans font-black text-2xl text-white tracking-tighter">IA</span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold">
              INNOVATION CORE
            </span>
            <span className="font-mono text-[10px] text-white/50 uppercase font-semibold">
              {activeTab === 'WEB' ? 'WEB PLATFORM' : activeTab === 'APP' ? 'MOBILE APP' : 'AI AGENTS'}
            </span>
          </div>

          {/* Right Column Nodes */}
          <div className="flex flex-col gap-6 w-72 relative z-20">
            {currentPreset.right.map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node as any)}
                  onClick={() => setActiveNode(node as any)}
                  className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-xl group ${isSelected
                      ? 'border-primary bg-primary/15 shadow-[0_0_30px_rgba(168,85,247,0.3)] scale-105'
                      : 'border-white/10 bg-[#0a0a10]/80 hover:border-white/25 hover:bg-white/[0.04]'
                    }`}
                >
                  {/* Metric Pill */}
                  <span
                    className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest"
                    style={{ backgroundColor: `${node.color}20`, color: node.color, borderColor: `${node.color}40` }}
                  >
                    {node.metric}
                  </span>

                  <div className="flex items-center gap-3.5 text-right">
                    <div className="flex flex-col">
                      <span className="font-sans font-extrabold text-sm text-white tracking-tight">
                        {node.title}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 font-semibold">
                        {node.badge}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-110 transition-transform">
                      <img src={node.logo} alt={node.title} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Tech Node Inspection Drawer */}
        {activeNode && (
          <div className="w-full max-w-xl p-5 rounded-2xl border border-primary/30 bg-[#0a0a12]/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-[0_15px_40px_rgba(0,0,0,0.8)] animate-[fadeSlideIn_0.2s_ease-out]">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center p-2 shrink-0"
                style={{ backgroundColor: `${activeNode.color}20`, borderColor: `${activeNode.color}50` }}
              >
                <img src={activeNode.logo} alt={activeNode.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="font-sans font-extrabold text-base text-white">{activeNode.title}</h4>
                  <span className="font-mono text-[9px] text-primary uppercase font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
                    {activeNode.badge}
                  </span>
                </div>
                <p className="font-mono text-xs text-white/70 mt-1">{activeNode.desc}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="font-mono text-[10px] text-white/40 hover:text-white uppercase font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors shrink-0"
            >
              DISMISS
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
