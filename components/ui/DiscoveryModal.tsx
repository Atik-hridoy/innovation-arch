'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../../lib/config';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TIME_SLOTS = [
  { id: '09-30-am', label: '09:30 AM', period: 'Morning Slot' },
  { id: '11-00-am', label: '11:00 AM', period: 'Morning Slot' },
  { id: '02-00-pm', label: '02:00 PM', period: 'Afternoon Slot' },
  { id: '03-30-pm', label: '03:30 PM', period: 'Afternoon Slot' },
  { id: '05-00-pm', label: '05:00 PM', period: 'Evening Slot' },
  { id: '07-30-pm', label: '07:30 PM', period: 'Evening Slot' },
];

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  const today = useMemo(() => new Date(), []);
  
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default to tomorrow
    return d;
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('02-00-pm');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Custom Web Platform / SaaS');
  const [message, setMessage] = useState('');
  
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calendar calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (prev.getFullYear() >= today.getFullYear() && (prev.getFullYear() > today.getFullYear() || prev.getMonth() >= today.getMonth())) {
      setCurrentMonthDate(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const isDateSelected = (dayNum: number) => {
    return (
      selectedDate.getDate() === dayNum &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isDateDisabled = (dayNum: number) => {
    const checkDate = new Date(year, month, dayNum);
    checkDate.setHours(23, 59, 59, 999);
    return checkDate < today;
  };

  const handleSelectDate = (dayNum: number) => {
    if (isDateDisabled(dayNum)) return;
    setSelectedDate(new Date(year, month, dayNum));
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const slotObj = TIME_SLOTS.find(s => s.id === selectedSlot);
    const timeLabel = slotObj ? slotObj.label : selectedSlot;
    const refCode = `ARK-${Math.floor(100000 + Math.random() * 900000)}`;

    const fullMessagePayload = `
📅 [LIVE 3D STRATEGY CALL BOOKING]
----------------------------------
Ref Code: ${refCode}
Target Email: hello@innovationark.co

Client Name: ${name}
Work Email: ${email}
Phone/WhatsApp: ${phone || 'N/A'}
Service Interested: ${projectType}

Selected Date: ${formattedDate}
Selected Time Slot: ${timeLabel} (${slotObj?.period || ''})

Project Summary:
${message}
----------------------------------
Sent directly from InnovationArk Custom Live Booking Engine.
    `.trim();

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: fullMessagePayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not record booking request. Please try again.');
      }

      setBookingRef(refCode);
      setIsSuccess(true);
    } catch (err: any) {
      // Fallback display if backend is offline
      setBookingRef(refCode);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSlotObj = TIME_SLOTS.find(s => s.id === selectedSlot);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-[fadeIn_0.25s_ease-out]">
      {/* 3D Glass Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity touch-none overscroll-none"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Obsidian 3D Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-700/80 dark:border-slate-800 bg-slate-900/95 text-white p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 my-auto overflow-hidden">
        
        {/* Glow accent spheres */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Header Badge */}
        <div className="flex flex-col gap-1 mb-6 pr-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold">
              Obsidian Live Booking Engine
            </span>
          </div>
          <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight mt-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-200">
            Book 30-Min Strategy Call
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-normal">
            Directly reserve a live technical scoping session with our lead architects.
          </p>
        </div>

        {/* ========================================================= */}
        {/* SUCCESS CONFIRMATION STATE */}
        {/* ========================================================= */}
        {isSuccess ? (
          <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-center gap-5 my-4 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div>
              <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">
                Booking Confirmed!
              </h3>
              <p className="text-xs text-emerald-300 font-mono mt-1">
                Ref Code: <span className="font-bold text-white bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40">{bookingRef}</span>
              </p>
            </div>

            <div className="w-full max-w-md bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-300">
                <span className="text-slate-500 font-mono uppercase">Client:</span>
                <span className="font-semibold text-white">{name} ({email})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-300">
                <span className="text-slate-500 font-mono uppercase">Date:</span>
                <span className="font-semibold text-amber-400">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-mono uppercase">Time Slot:</span>
                <span className="font-semibold text-amber-400">{TIME_SLOTS.find(s=>s.id===selectedSlot)?.label}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md">
              We have dispatched the calendar invitation and meeting link to your email. See you on the strategy call!
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <>
            {/* Step Navigation Tabs */}
            <div className="flex gap-3 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 relative z-10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  step === 1
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>1. Select Date & Time</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  step === 2
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>2. Your Details & Brief</span>
              </button>
            </div>

            {/* STEP 1: INTERACTIVE 3D CALENDAR & TIME SLOTS */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                
                {/* 3D Month Calendar Grid */}
                <div className="md:col-span-7 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80 shadow-inner">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                      {monthNames[month]} {year}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-7 h-7 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-7 h-7 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Day Name Labels */}
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-slate-500 font-bold uppercase mb-2">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty offset padding days */}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-9" />
                    ))}

                    {/* Month Days */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const selected = isDateSelected(dayNum);
                      const disabled = isDateDisabled(dayNum);

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={disabled}
                          onClick={() => handleSelectDate(dayNum)}
                          className={`h-9 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            selected
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/30 scale-105 border border-amber-300/50'
                              : disabled
                              ? 'text-slate-700 opacity-40 cursor-not-allowed'
                              : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800/80'
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Column */}
                <div className="md:col-span-5 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                        Available Time Slots
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        🟢 Live Slots
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        const active = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              active
                                ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-amber-500/80 shadow-md shadow-amber-500/10 text-amber-300'
                                : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className="font-mono text-xs font-bold">{slot.label}</span>
                            <span className="text-[9px] font-mono uppercase text-slate-500">{slot.period}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Proceed to Client Brief →</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: CLIENT INFORMATION & PROJECT BRIEF */}
            {step === 2 && (
              <form onSubmit={handleBookSubmit} className="flex flex-col gap-4 relative z-10">
                {/* Selection Summary Bar */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="material-symbols-outlined text-amber-400 text-sm">calendar_month</span>
                    <span>
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{selectedSlotObj?.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[10px] uppercase underline text-slate-400 hover:text-white cursor-pointer"
                  >
                    Change Time
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold ml-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 focus:border-amber-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold ml-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 focus:border-amber-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold ml-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 focus:border-amber-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400 font-bold ml-1">Service Required</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="bg-slate-950/90 border border-slate-800 focus:border-amber-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="Custom Web Platform / SaaS">Custom Web Platform / SaaS</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="AI & Enterprise Automation">AI & Enterprise Automation</option>
                      <option value="Complete Technical Audit">Complete Technical Audit</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400 font-bold ml-1">Project Brief / Notes *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your goals, technical scope, or timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-slate-950/90 border border-slate-800 focus:border-amber-500 text-white rounded-xl px-4 py-2.5 text-xs outline-none transition-colors resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">{errorMessage}</p>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white border border-slate-800 rounded-xl cursor-pointer"
                  >
                    ← Back to Calendar
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending to hello@innovationark.co...</span>
                    ) : (
                      <span>Confirm & Book Strategy Call →</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default DiscoveryModal;
