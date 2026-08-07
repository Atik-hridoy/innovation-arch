'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ─── Data ─── */

interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
  spec: string;
}

interface ServiceSlide {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  themeColor: string;
  pillColor: string;
  features: FeatureItem[];
  codeSnippets: string[];
  facilities: string[];
}

const SLIDES: ServiceSlide[] = [
  {
    title: 'MOBILE APPS',
    subtitle: 'iOS & Android Ecosystems',
    desc: 'Beautiful, native and cross-platform mobile experiences crafted with Flutter and React Native. Fully optimized for fluid performance and user delight.',
    image: '/images/mobile.webp',
    themeColor: '#a855f7',
    pillColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    features: [
      { icon: 'phone_iphone', title: 'Cross-Platform', desc: 'High-performance Flutter builds', spec: 'FLUTTER / SWIFT' },
      { icon: 'security', title: 'Secure Logins', desc: 'Biometric FaceID & Secure Keychains', spec: 'BIOMETRICS' },
      { icon: 'database', title: 'Offline Sync', desc: 'Robust local cache databases', spec: 'SQLITE / REALM' },
      { icon: 'notifications_active', title: 'Push Alerts', desc: 'Real-time user engagement flows', spec: 'FCM / APNS' },
    ],
    codeSnippets: [
      'import "package:flutter/material.dart";',
      'void main() => runApp(const MyApp());',
      'class MyApp extends StatelessWidget {',
      '  const MyApp({super.key});',
      '  @override',
      '  Widget build(BuildContext context) {',
      '    return MaterialApp(',
      '      theme: ThemeData.dark(),',
      '      home: const EcosystemDashboard(),',
      '    );',
      '  }',
      '}',
      '// [SYSTEM: INITIALIZING FLUTTER ENGINE]',
    ],
    facilities: [
      'Custom UI/UX design tailored for iOS & Android',
      'Cross-platform development with Flutter or React Native',
      'App Store & Play Store submission & optimization',
      'Push notifications, in-app messaging & analytics',
      'Biometric authentication & secure data storage',
      'Offline-first architecture with local database sync',
      'Payment gateway integration (Stripe, Razorpay, etc.)',
      'Post-launch maintenance, monitoring & version updates',
    ]
  },
  {
    title: 'WEB SOLUTIONS',
    subtitle: 'Fast, Modern & Scalable Sites',
    desc: 'High-fidelity, responsive web platforms built with Next.js, React and Tailwind. Engineered for rapid load speeds, SEO optimization, and premium motion design.',
    image: '/images/web.webp',
    themeColor: '#06b6d4',
    pillColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    features: [
      { icon: 'bolt', title: 'Next.js Engine', desc: 'Sub-second static & server loads', spec: 'SSR / ISR' },
      { icon: 'travel_explore', title: 'SEO Engineering', desc: 'Rich schema metadata configs', spec: 'SCHEMA' },
      { icon: 'animation', title: 'Motion Design', desc: 'GSAP timelines & micro-animations', spec: 'GSAP' },
      { icon: 'insights', title: 'Telemetry', desc: 'Custom user flow analytics tracking', spec: 'HOTJAR' },
    ],
    codeSnippets: [
      'import { useState, useEffect } from "react";',
      'import { motion } from "framer-motion";',
      'export default function PremiumWeb() {',
      '  const [status, setStatus] = useState("loading");',
      '  useEffect(() => {',
      '    fetchTelemetryData();',
      '  }, []);',
      '  return (',
      '    <motion.div animate={{ opacity: 1 }}>',
      '      <NextJsEngine speed="sub-second" />',
      '    </motion.div>',
      '  );',
      '}',
    ],
    facilities: [
      'Responsive, pixel-perfect design for all screen sizes',
      'Next.js / React SPA or SSR architecture setup',
      'SEO optimization with structured data & meta tags',
      'CMS integration (Sanity, Strapi, WordPress headless)',
      'Custom animations & micro-interactions with GSAP',
      'Performance tuning — sub-second load times',
      'Analytics dashboard integration (GA4, Hotjar, Mixpanel)',
      'Hosting setup, CI/CD pipeline & domain configuration',
    ]
  },
  {
    title: 'AI AUTOMATION',
    subtitle: 'Intelligent Systems & Agents',
    desc: 'Custom autonomous AI agents, LLM integrations, and cognitive workflows that automate complex enterprise operations, scaling efficiency and productivity.',
    image: '/images/intelligence.webp',
    themeColor: '#ec4899',
    pillColor: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    features: [
      { icon: 'psychology', title: 'LLM Orchestration', desc: 'LangChain, Claude & GPT integrations', spec: 'LLM CORE' },
      { icon: 'hub', title: 'Agent Loops', desc: 'Self-routing cognitive task workers', spec: 'AUTO RUN' },
      { icon: 'storage', title: 'Vector Database', desc: 'Pinecone semantic search catalogs', spec: 'PINECONE' },
      { icon: 'integration_instructions', title: 'Cognitive APIs', desc: 'Automated data parsing models', spec: 'LANGCHAIN' },
    ],
    codeSnippets: [
      'from langchain.agents import AgentExecutor',
      'from langchain.vectorstores import Pinecone',
      'agent = create_openai_tools_agent(llm, tools)',
      'executor = AgentExecutor(agent=agent, tools=tools)',
      'response = executor.invoke({',
      '  "input": "optimize database query loops"',
      '})',
      'print(f"Agent state: {response.state}")',
      'db.similarity_search("semantic query index")',
    ],
    facilities: [
      'Custom AI agent development for business workflows',
      'LLM integration (GPT, Claude, Gemini, open-source)',
      'RAG pipeline with vector database (Pinecone, Weaviate)',
      'Chatbot & conversational AI interface design',
      'Automated data extraction, parsing & classification',
      'API development for AI model serving & inference',
      'Fine-tuning & prompt engineering for domain tasks',
      'Monitoring, logging & continuous model improvement',
    ]
  },
];

/* ─── Component ─── */

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleFacilities, setVisibleFacilities] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const active = SLIDES[activeIndex];
  const marqueeText = `${active.title} • ${active.subtitle} • `;
  const snippets = active.codeSnippets;
  const themeColor = active.themeColor;

  /* Reset expanded and typing on tab change */
  useEffect(() => {
    setExpanded(false);
    setVisibleLines(0);
    setVisibleFacilities(0);
  }, [activeIndex]);

  /* Typewriter: reveal code lines one by one */
  useEffect(() => {
    if (expanded) return;
    if (visibleLines >= snippets.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 120);
    return () => clearTimeout(timer);
  }, [visibleLines, expanded, snippets.length]);

  /* Reveal facilities one by one */
  useEffect(() => {
    if (!expanded) { setVisibleFacilities(0); return; }
    if (visibleFacilities >= active.facilities.length) return;
    const timer = setTimeout(() => {
      setVisibleFacilities((prev) => prev + 1);
    }, 150);
    return () => clearTimeout(timer);
  }, [expanded, visibleFacilities, active.facilities.length]);

  /* Animate content swap on tab change */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.svc-hero-desc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.08, ease: 'power3.out' });
      gsap.fromTo('.svc-feat-card', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.12, ease: 'power2.out' });
      gsap.fromTo('.svc-code-line', { opacity: 0, x: -10 }, { opacity: 0.35, x: 0, duration: 0.35, stagger: 0.025, delay: 0.15, ease: 'power2.out' });
      gsap.fromTo('.marquee-back-text', { opacity: 0 }, { opacity: 0.35, duration: 0.8, ease: 'power2.out' });
      gsap.fromTo('.code-line-item', { opacity: 0, x: -15 }, { opacity: 0.25, x: 0, duration: 0.6, stagger: 0.03, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden border-t border-white/5 z-10 bg-[#080810]"
    >
      {/* ━━━ Background Motion Layer (preserved) ━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Top Marquee (Left → Right) */}
        <div className="absolute top-[10%] left-0 w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-reverse inline-flex whitespace-nowrap">
            {[0, 1].map((i) => (
              <span key={i} className="font-sans font-black text-[9vw] tracking-[0.25em] text-transparent uppercase marquee-back-text px-4" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.35)' }}>
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Marquee (Right → Left) */}
        <div className="absolute bottom-[10%] left-0 w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-flex whitespace-nowrap">
            {[0, 1].map((i) => (
              <span key={i} className="font-sans font-black text-[9vw] tracking-[0.25em] text-transparent uppercase marquee-back-text px-4" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.35)' }}>
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* Floating Code Stream */}
        <div className="absolute top-[32%] left-[6%] max-w-[40vw] flex flex-col gap-1 font-mono text-[9px] text-[#00bfff]">
          {snippets.map((line, i) => (
            <div key={i} className="code-line-item opacity-25 whitespace-nowrap">{line}</div>
          ))}
        </div>

        {/* Radial Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-[0.12] transition-all duration-1000"
          style={{ backgroundImage: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* ━━━ Foreground Content ━━━ */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70 font-semibold">
              // WHAT WE BUILD
            </span>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter leading-[0.95]">
              Our Services
            </h2>
          </div>

          {/* ── Tab Pills ── */}
          <div className="flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.title}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-5 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-400 cursor-pointer ${
                  idx === activeIndex
                    ? 'text-white bg-white/10 border border-white/15 shadow-lg'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                }`}
              >
                {slide.title}
                {idx === activeIndex && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full" style={{ backgroundColor: slide.themeColor }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ▎ Main Feature Card (Large, spans 7 cols) */}
          <div className="lg:col-span-7 relative rounded-[28px] border border-white/8 bg-[#0a0a0c]/60 backdrop-blur-xl overflow-hidden min-h-[420px] flex flex-col justify-between p-8 md:p-10 group">
            {/* Card bg image */}
            <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent" />
            </div>

            {/* Top badge row */}
            <div className="relative z-10 flex items-center gap-3">
              <span className={`font-mono text-[9px] uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border font-bold ${active.pillColor}`}>
                {active.subtitle}
              </span>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ backgroundColor: themeColor + '66' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: themeColor }} />
              </span>
            </div>

            {/* Title + Desc */}
            <div className="relative z-10 mt-auto flex flex-col gap-4">
              <h3 className="svc-hero-title font-sans font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] text-white uppercase tracking-tighter leading-[0.95]">
                {active.title}
              </h3>
              <p className="svc-hero-desc text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
                {active.desc}
              </p>
              <div className="flex items-center gap-6 mt-2">
                <button
                  onClick={() => setExpanded(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 text-white font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 backdrop-blur-md cursor-pointer"
                >
                  Explore Service
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
                <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider hidden md:inline">0{activeIndex + 1} / 0{SLIDES.length}</span>
              </div>
            </div>
          </div>

          {/* ▎ Right Column: Code Console + Nav (spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Code Terminal / Facilities Card */}
            <div className="relative rounded-[24px] border border-white/8 bg-[#08080a]/70 backdrop-blur-xl p-6 flex-1 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-auto font-mono text-[8px] text-white/30 uppercase tracking-wider">
                  {expanded ? `${active.title.toLowerCase()} // deliverables` : `${active.title.toLowerCase()}.tsx`}
                </span>
              </div>

              {/* Content: Code or Facilities */}
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
                          borderColor: themeColor + '25',
                          backgroundColor: themeColor + '08',
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

            {/* Slide Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((p) => (p - 1 + SLIDES.length) % SLIDES.length)}
                className="flex-1 h-14 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Previous Service"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
              <button
                onClick={() => setActiveIndex((p) => (p + 1) % SLIDES.length)}
                className="flex-1 h-14 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 cursor-pointer"
                aria-label="Next Service"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* ▎ Bottom Row: Feature Spec Cards (4 cards spanning full width) */}
          {active.features.map((feat) => (
            <div
              key={feat.title}
              className="svc-feat-card lg:col-span-3 rounded-[20px] border border-white/6 bg-[#08080a]/50 backdrop-blur-md p-5 flex flex-col gap-3 hover:bg-white/[0.03] hover:border-white/12 transition-all duration-300 group/feat relative overflow-hidden"
            >
              {/* Accent top line */}
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${themeColor}30, transparent)` }} />

              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-lg" style={{ color: themeColor }}>{feat.icon}</span>
                <span className="font-mono text-[7px] uppercase tracking-widest text-white/20 font-bold">{feat.spec}</span>
              </div>
              <span className="font-sans font-bold text-[13px] text-white tracking-tight leading-tight">{feat.title}</span>
              <span className="font-mono text-[10px] text-white/40 leading-snug">{feat.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
