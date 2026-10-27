'use client';

import { useMemo, useState } from 'react';
import { CONFIG } from '@/lib/config';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const TIMES = ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
const PROJECTS = ['Web platform or SaaS', 'Mobile application', 'AI and automation', 'Technical review', 'Still exploring'];
const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate());

export function BookingSection() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const tomorrow = useMemo(() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), [today]);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(tomorrow);
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState(PROJECTS[0]);
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const dateLabel = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    const fullDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const message = ['Discovery call request', `Preferred date: ${fullDate}`, `Preferred time: ${selectedTime} (Asia/Dhaka)`, `Project: ${project}`, '', brief || 'No additional context provided.'].join('\n');
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/contacts/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) });
      if (!response.ok) throw new Error();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="book" className="relative overflow-hidden border-t border-slate-200 bg-[#f4f6f8] py-20 dark:border-white/10 dark:bg-[#080b10] sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="site-container">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Schedule a conversation</p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">A useful first conversation starts with context.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">Choose a preferred time and share what you are working through. We will review it before the call and confirm availability by email.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-[#0d1118] dark:shadow-[0_30px_90px_rgba(0,0,0,0.24)]">
          <div className="grid xl:grid-cols-[260px_1fr_390px]">
            <aside className="flex flex-col border-b border-slate-200 bg-slate-950 p-7 text-white dark:border-white/10 xl:border-b-0 xl:border-r xl:border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" />Discovery session</div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em]">Product and technical consultation</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">A focused introduction to understand the challenge, current stage, and most useful next step.</p>
              <dl className="mt-8 space-y-5 border-t border-white/10 pt-6 text-sm">
                <div className="flex gap-3"><span className="material-symbols-outlined text-lg text-slate-500">schedule</span><div><dt className="text-xs text-slate-500">Duration</dt><dd className="mt-1 text-slate-200">30 minutes</dd></div></div>
                <div className="flex gap-3"><span className="material-symbols-outlined text-lg text-slate-500">videocam</span><div><dt className="text-xs text-slate-500">Format</dt><dd className="mt-1 text-slate-200">Video call</dd></div></div>
                <div className="flex gap-3"><span className="material-symbols-outlined text-lg text-slate-500">language</span><div><dt className="text-xs text-slate-500">Timezone</dt><dd className="mt-1 text-slate-200">Asia / Dhaka</dd></div></div>
              </dl>
              <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4 xl:mt-auto">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Your selection</p>
                <p className="mt-2 text-sm font-semibold">{dateLabel}</p>
                <p className="mt-1 text-sm text-blue-300">{selectedTime}</p>
              </div>
            </aside>

            <div className="border-b border-slate-200 p-5 dark:border-white/10 sm:p-8 xl:border-b-0 xl:border-r xl:border-white/10">
              <div className="flex items-center justify-between">
                <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">01 / Date and time</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3></div>
                <div className="flex gap-2">
                  <button type="button" disabled={isCurrentMonth} onClick={() => setVisibleMonth(new Date(year, month - 1, 1))} className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-25 dark:border-white/10 dark:hover:bg-white/5" aria-label="Previous month"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                  <button type="button" onClick={() => setVisibleMonth(new Date(year, month + 1, 1))} className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Next month"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-7 text-center text-[9px] font-semibold tracking-[0.12em] text-slate-400">{DAYS.map(day => <span key={day} className="pb-4">{day}</span>)}</div>
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {Array.from({ length: firstDay }, (_, index) => <span key={`empty-${index}`} />)}
                {Array.from({ length: daysInMonth }, (_, index) => {
                  const day = index + 1;
                  const candidate = new Date(year, month, day);
                  const disabled = candidate < today;
                  const selected = candidate.getTime() === selectedDate.getTime();
                  const isToday = candidate.getTime() === today.getTime();
                  return <button key={day} type="button" disabled={disabled} onClick={() => setSelectedDate(candidate)} aria-label={`${candidate.toLocaleDateString()}${selected ? ', selected' : ''}`} className={`relative aspect-square rounded-lg text-sm font-medium transition-all ${selected ? 'bg-blue-600 text-white shadow-[0_8px_22px_rgba(37,99,235,.28)]' : disabled ? 'cursor-not-allowed text-slate-300 dark:text-slate-700' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'}`}>{day}{isToday && !selected && <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />}</button>;
                })}
              </div>
              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-white/10">
                <div className="mb-3 flex items-center justify-between"><p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Preferred time</p><span className="text-[10px] text-slate-400">Times shown in Asia/Dhaka</span></div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TIMES.map(time => <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-md border px-3 py-3 text-xs font-semibold transition-all ${selectedTime === time ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300' : 'border-slate-200 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:text-slate-400 dark:hover:border-white/25'}`}>{time}</button>)}
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="flex min-h-full flex-col p-5 sm:p-8">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">02 / Your context</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Help us prepare.</h3></div>
              {status === 'sent' ? (
                <div className="flex flex-1 flex-col justify-center py-12"><div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><span className="material-symbols-outlined">check</span></div><h3 className="mt-6 text-2xl font-semibold tracking-tight">Request received.</h3><p className="mt-3 text-sm leading-6 text-slate-500">We will review your note and confirm the selected time by email.</p></div>
              ) : (
                <>
                  <div className="mt-7 space-y-4">
                    <label className="block"><span className="mb-2 block text-xs font-medium">Name</span><input required autoComplete="name" value={name} onChange={event => setName(event.target.value)} placeholder="Your name" className="w-full rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
                    <label className="block"><span className="mb-2 block text-xs font-medium">Work email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" className="w-full rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
                    <label className="block"><span className="mb-2 block text-xs font-medium">Project type</span><select value={project} onChange={event => setProject(event.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-white/10 dark:bg-[#0d1118]">{PROJECTS.map(item => <option key={item}>{item}</option>)}</select></label>
                    <label className="block"><span className="mb-2 block text-xs font-medium">What should we know? <span className="font-normal text-slate-400">(optional)</span></span><textarea rows={3} value={brief} onChange={event => setBrief(event.target.value)} placeholder="The challenge, current stage, or timeline" className="w-full resize-none rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
                  </div>
                  {status === 'error' && <p role="alert" className="mt-4 text-xs leading-5 text-rose-600 dark:text-rose-400">We could not send the request. Please try again or email hello@innovationark.co.</p>}
                  <button type="submit" disabled={status === 'sending'} className="mt-5 flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100">{status === 'sending' ? 'Sending request...' : 'Request this time'}<span className="material-symbols-outlined text-base">arrow_forward</span></button>
                  <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">No commitment. Your details are used only to arrange this conversation.</p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
