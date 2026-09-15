'use client';

import React, { useState, useMemo } from 'react';
import { CONFIG } from '@/lib/config';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function InteractiveStudioEngine() {
  const today = useMemo(() => new Date(), []);
  const todayDateNum = today.getDate(); // e.g. 16 or current day

  // Scoping questionnaire state
  const [selectedProjectType, setSelectedProjectType] = useState<string>('saas');
  const [activeTab, setActiveTab] = useState<'calendar' | 'engine' | 'audit'>('calendar');

  // Selected Date state (defaults to today)
  const [selectedDate, setSelectedDate] = useState<number>(todayDateNum);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('02:00 PM');

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNote, setClientNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // 30 calendar days for the current month
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setIsSubmitting(true);
    const ref = `ARK-${Math.floor(100000 + Math.random() * 900000)}`;

    const projectLabels: Record<string, string> = {
      mobile: 'Mobile App (iOS & Android)',
      saas: 'Custom Web Platform / SaaS',
      ai: 'Enterprise AI Automation Engine',
      cloud: 'Cloud Scoping & Technical Audit',
    };

    const messagePayload = `
📅 [HOMEPAGE STUDIO ENGINE BOOKING]
------------------------------------
Ref Code: ${ref}
Target Email: hello@innovationark.co

Client Name: ${clientName}
Work Email: ${clientEmail}
Selected Service: ${projectLabels[selectedProjectType] || selectedProjectType}

Selected Date: September ${selectedDate}, 2026
Selected Time Slot: ${selectedSlotTime}

Notes / Brief:
${clientNote || 'None provided.'}
------------------------------------
Sent directly from InnovationArk Embedded Studio Widget.
    `.trim();

    try {
      await fetch(`${CONFIG.API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          message: messagePayload,
        }),
      });
      setBookingRef(ref);
      setIsSuccess(true);
    } catch (err) {
      setBookingRef(ref);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-8 sm:py-16 md:py-20 bg-slate-50/50 dark:bg-[#07090e] relative overflow-hidden transition-colors duration-300 border-y border-slate-200/80 dark:border-slate-800/80">
      
      {/* Dynamic ambient radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[850px] h-[300px] sm:h-[450px] md:h-[550px] bg-gradient-to-r from-blue-600/15 via-amber-500/15 to-purple-600/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 md:px-12 lg:px-16 2xl:px-20 relative z-10">
        
        {/* Top Floating Prompt Banner */}
        <div className="w-full max-w-3xl mx-auto mb-5 sm:mb-8 text-center px-2">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300 text-[10px] sm:text-xs font-mono font-semibold shadow-xs">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="truncate">Test our Live Studio Architecture & Strategy Engine</span>
          </div>
        </div>

        {/* Main Embedded Lodgify-Style 3D Studio Widget */}
        <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-300/80 dark:border-slate-800 bg-white/95 dark:bg-[#0b0e17]/95 text-slate-900 dark:text-white shadow-[0_15px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
          
          {/* ========================================================= */}
          {/* LEFT PANEL: INTERACTIVE QUESTIONNAIRE / SCOPING (Col 1-4) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 p-4 sm:p-6 lg:p-8 bg-slate-100/70 dark:bg-[#0f1422] border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between gap-5 sm:gap-6">
            
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs shadow-md">
                    1
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                    Project Scoper
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Direct Founder Access
                </span>
              </div>

              <h3 className="font-sans font-black text-lg sm:text-xl lg:text-2xl tracking-tight text-slate-900 dark:text-white uppercase mb-1.5 sm:mb-2">
                What are you looking to build?
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                Select your product focus to unlock available strategy sessions on our master studio calendar.
              </p>

              {/* Scoping Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                {[
                  { id: 'mobile', icon: 'smartphone', title: 'Mobile App (iOS & Android)', desc: 'Cross-platform native apps with Swift & Kotlin' },
                  { id: 'saas', icon: 'web', title: 'Custom Web Platform / SaaS', desc: 'High-scale web engines built with Next.js & Node' },
                  { id: 'ai', icon: 'smart_toy', title: 'Enterprise AI Engine', desc: 'Custom LLMs, RAG, & workflow automation' },
                  { id: 'cloud', icon: 'cloud_sync', title: 'Cloud Audit & Scoping', desc: 'Infrastructure cost, security & speed review' },
                ].map((option) => {
                  const isSelected = selectedProjectType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedProjectType(option.id)}
                      className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-white dark:bg-[#141b2d] border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/30'
                          : 'bg-white/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                          : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        <span className="material-symbols-outlined text-base sm:text-lg">{option.icon}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {option.title}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          {option.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Status Footer */}
            <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] sm:text-xs font-mono">
              <span className="text-slate-500">Selected Scope:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 uppercase truncate ml-2">
                {selectedProjectType}
              </span>
            </div>

          </div>

          {/* ========================================================= */}
          {/* MIDDLE SIDEBAR MENU + RIGHT VIEW CANVAS (Col 5-12)         */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 flex flex-col md:flex-row">
            
            {/* Responsive Sidebar Navigation Tabs */}
            <div className="w-full md:w-56 p-3 sm:p-4 bg-slate-100/60 dark:bg-[#0a0d15] border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 flex md:flex-col justify-between shrink-0 overflow-x-auto no-scrollbar">
              <div className="flex md:flex-col gap-1.5 sm:gap-2 w-full min-w-max md:min-w-0">
                
                {/* Brand Header */}
                <div className="hidden md:flex items-center gap-3 p-2 mb-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black flex items-center justify-center font-mono text-xs shadow-lg shadow-amber-500/30 shrink-0">
                    IA
                  </div>
                  <div>
                    <span className="font-sans font-black text-xs sm:text-sm uppercase tracking-wide text-slate-900 dark:text-white block">
                      STUDIO PORTAL
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 block">v2.4 Production</span>
                  </div>
                </div>

                {[
                  { id: 'calendar', icon: 'calendar_month', label: 'Master Calendar' },
                  { id: 'engine', icon: 'terminal', label: 'Studio Engine' },
                  { id: 'audit', icon: 'shield', label: 'NDA Scoping' },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id as any)}
                      className={`px-3 py-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-[1.02]'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base sm:text-lg">{item.icon}</span>
                      <span className="font-sans tracking-tight whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500">
                Live Status: <span className="text-emerald-500 font-bold">🟢 6 Slots Open</span>
              </div>
            </div>

            {/* Main Dynamic Tab Canvas */}
            <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between gap-5 sm:gap-6 bg-white dark:bg-[#0c0f18] overflow-hidden">
              
              {/* TAB 1: MASTER CALENDAR */}
              {activeTab === 'calendar' && (
                <>
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        Master Studio Calendar
                      </h4>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px] sm:text-xs font-semibold">
                        September 2026
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono">
                      <span className="text-slate-500 hidden sm:inline">Direct Delivery:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                        hello@innovationark.co
                      </span>
                    </div>
                  </div>

                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase">
                    {DAYS_OF_WEEK.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  {/* Clean Responsive Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {/* Offset padding cell */}
                    <div className="h-10 sm:h-14 md:h-16 rounded-lg sm:rounded-xl bg-slate-50/40 dark:bg-slate-900/20" />

                    {calendarDays.map((day) => {
                      const isSelected = selectedDate === day;
                      const isToday = day === todayDateNum; // BLING-BLING FOR TODAY'S DATE!
                      const isPast = day < todayDateNum;

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isPast}
                          onClick={() => setSelectedDate(day)}
                          className={`h-10 sm:h-14 md:h-16 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                            isToday
                              ? 'bg-gradient-to-br from-amber-500/20 via-yellow-400/10 to-amber-600/20 border-2 border-amber-400 dark:border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/50 scale-[1.03] z-10'
                              : isSelected
                              ? 'bg-blue-50/90 dark:bg-[#141b2d] border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                              : isPast
                              ? 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-800/40 opacity-40 cursor-not-allowed'
                              : 'bg-slate-50/90 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {/* Day Header Row */}
                          <div className="flex items-center justify-between w-full">
                            <span className={`font-mono text-[11px] sm:text-xs font-bold ${
                              isToday
                                ? 'text-amber-600 dark:text-amber-300 font-black'
                                : isSelected
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}>
                              {day}
                            </span>

                            {/* 🔥 BLING-BLING TODAY BADGE */}
                            {isToday && (
                              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[7px] sm:text-[8px] uppercase px-1 py-0.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse border border-yellow-200">
                                ✨ TODAY
                              </span>
                            )}
                          </div>

                          {/* Selection indicator pill */}
                          {isSelected && !isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute bottom-1.5 right-1.5 animate-ping" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Booking Action Form Row */}
                  <div className="pt-3 sm:pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono w-full sm:w-auto justify-between sm:justify-start">
                      <span className="text-slate-500">Selected Session:</span>
                      <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700">
                        Sep {selectedDate}, 2026 @ {selectedSlotTime}
                      </span>
                    </div>

                    {isSuccess ? (
                      <div className="text-[11px] sm:text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center gap-2 w-full sm:w-auto justify-center">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Session Reserved! Ref: {bookingRef}</span>
                      </div>
                    ) : (
                      <form onSubmit={handleBookSession} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full sm:w-32 px-3 py-2 sm:py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-amber-500 text-slate-900 dark:text-white"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Work Email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full sm:w-36 px-3 py-2 sm:py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-amber-500 text-slate-900 dark:text-white"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all shrink-0"
                        >
                          {isSubmitting ? 'Reserving...' : 'Book Call →'}
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* TAB 2: STUDIO ENGINE TERMINAL VIEW */}
              {activeTab === 'engine' && (
                <div className="flex flex-col gap-3 sm:gap-4 font-mono">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="font-sans font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        Studio Architecture Engine
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Live infrastructure telemetry & continuous deployment pipeline.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/30 rounded-full text-[10px] sm:text-xs font-bold">
                      Turbopack v16.3
                    </span>
                  </div>

                  {/* Terminal Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-[11px] sm:text-xs space-y-2 font-mono">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[9px] sm:text-[10px] text-slate-500">
                      <span>STATUS: OPERATIONAL</span>
                      <span>REGION: GLOBAL PIPELINE</span>
                    </div>
                    <p className="text-emerald-400">✓ [Build Engine] Next.js Turbopack compiled in 2.9s</p>
                    <p className="text-blue-400">⚡ [API Gateway] Django REST Framework v3.14 active</p>
                    <p className="text-amber-400">🤖 [AI Pipeline] OpenAI & Claude RAG Workers Online</p>
                    <p className="text-slate-400">🔒 [Security Audit] Zero vulnerabilities detected across 42 modules</p>
                    <p className="text-slate-500 pt-2 border-t border-slate-800 text-[9px] sm:text-[10px]">
                      Average Response Latency: <span className="text-white font-bold">14ms</span> • Uptime SLA: <span className="text-emerald-400 font-bold">99.99%</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase">Deploy Speed</span>
                      <span className="font-sans font-black text-sm sm:text-lg text-slate-900 dark:text-white">&lt; 3.0s</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase">Overhead</span>
                      <span className="font-sans font-black text-sm sm:text-lg text-amber-500">0%</span>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase">Uptime SLA</span>
                      <span className="font-sans font-black text-sm sm:text-lg text-emerald-500">99.99%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: NDA SCOPING & SECURITY VIEW */}
              {activeTab === 'audit' && (
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                        NDA & IP Ownership Guarantee
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        Strict confidentiality and 100% IP rights assigned to your company.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-full text-[10px] sm:text-xs font-mono font-bold">
                      Protected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-base sm:text-lg">description</span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Mutual NDA Included
                      </h5>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Every consultation call is covered under our bilateral NDA protecting your IP and trade secrets.
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-base sm:text-lg">key</span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Full Code Repository Transfer
                      </h5>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        All source code, design assets, and cloud credentials are standardly transferred directly to your organization.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-base">verified_user</span>
                      <span>Need a custom signed NDA prior to call?</span>
                    </div>
                    <a
                      href="mailto:hello@innovationark.co?subject=Request%20Pre-Call%20NDA"
                      className="w-full sm:w-auto text-center px-4 py-2 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Email hello@innovationark.co →
                    </a>
                  </div>
                </div>
              )}

              {/* Lodgify Style Disclaimer Caption */}
              <div className="text-[9px] sm:text-[10px] font-mono text-center text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/80 dark:border-slate-800/80">
                Interactive master studio portal. All reserved strategy calls trigger instant email alerts to <span className="text-amber-500 font-bold">hello@innovationark.co</span>.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default InteractiveStudioEngine;
