'use client';

import { useEffect, useMemo, useState } from 'react';
import { CONFIG } from '@/lib/config';

interface DiscoveryModalProps { isOpen: boolean; onClose: () => void; }

const TIME_SLOTS = ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const SERVICES = ['Web platform or SaaS', 'Mobile application', 'AI and automation', 'Technical review', 'Not sure yet'];

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const initialDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() + 1);
    return date;
  }, [today]);

  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState('02:00 PM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(SERVICES[0]);
  const [brief, setBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const dateLabel = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const selectDay = (day: number) => {
    const date = new Date(year, month, day);
    if (date < today) return;
    setSelectedDate(date);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const appointment = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const message = [
      'Discovery call request',
      `Preferred date: ${appointment}`,
      `Preferred time: ${selectedTime} (Asia/Dhaka)`,
      `Project type: ${service}`,
      '',
      brief || 'No additional brief provided.',
    ].join('\n');

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError('We could not send the request. Please try again or email hello@innovationark.co.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/65 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="relative mx-auto my-4 w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0b0e13] sm:my-8">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-500 transition-colors hover:text-slate-950 dark:border-white/10 dark:bg-[#0b0e13] dark:hover:text-white" aria-label="Close booking dialog">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {success ? (
          <div className="mx-auto flex min-h-[520px] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"><span className="material-symbols-outlined">check</span></div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Request received</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">We’ll confirm the time by email.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">Your preferred session is {dateLabel} at {selectedTime}. This is a request until our team confirms availability.</p>
            <button type="button" onClick={onClose} className="mt-8 rounded-md bg-slate-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Close</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <section className="border-b border-slate-200 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.025] sm:p-8 lg:border-b-0 lg:border-r lg:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">30-minute discovery call</p>
              <h2 id="booking-title" className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">Choose a time that works for you.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">A focused conversation about your product, priorities, and whether we are the right team to help.</p>

              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#0b0e13] sm:p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                  <div className="flex gap-1">
                    <button type="button" disabled={isCurrentMonth} onClick={() => setVisibleMonth(new Date(year, month - 1, 1))} className="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-25 dark:hover:bg-white/5" aria-label="Previous month"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
                    <button type="button" onClick={() => setVisibleMonth(new Date(year, month + 1, 1))} className="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Next month"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">{DAYS.map(day => <span key={day} className="pb-3">{day}</span>)}</div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }, (_, index) => <span key={`blank-${index}`} />)}
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const date = new Date(year, month, day);
                    const disabled = date < today;
                    const selected = date.getTime() === selectedDate.getTime();
                    return <button key={day} type="button" disabled={disabled} onClick={() => selectDay(day)} className={`aspect-square rounded-md text-xs font-medium transition-colors ${selected ? 'bg-blue-600 text-white' : disabled ? 'text-slate-300 dark:text-slate-700' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'}`}>{day}</button>;
                  })}
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold text-slate-700 dark:text-slate-300">Preferred time <span className="font-normal text-slate-400">· Asia/Dhaka</span></p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
                  {TIME_SLOTS.map(time => <button key={time} type="button" onClick={() => setSelectedTime(time)} className={`rounded-md border px-2 py-2.5 text-xs font-medium transition-colors ${selectedTime === time ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300' : 'border-slate-200 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:text-slate-400 dark:hover:border-white/25'}`}>{time}</button>)}
                </div>
              </div>
            </section>

            <form onSubmit={submit} className="flex flex-col p-5 pt-16 sm:p-8 sm:pt-16 lg:p-10 lg:pt-24">
              <div className="mb-7 flex items-center gap-3 border-b border-slate-200 pb-5 text-sm dark:border-white/10">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">event</span>
                <div><p className="font-semibold text-slate-950 dark:text-white">{dateLabel} · {selectedTime}</p><p className="mt-0.5 text-xs text-slate-500">30 minutes · Video call</p></div>
              </div>
              <div className="space-y-5">
                <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-300">Name</span><input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
                <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-300">Work email</span><input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
                <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-300">What are you considering?</span><select value={service} onChange={e => setService(e.target.value)} className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 dark:border-white/10 dark:bg-[#0b0e13]">{SERVICES.map(item => <option key={item}>{item}</option>)}</select></label>
                <label className="block"><span className="mb-2 block text-xs font-medium text-slate-700 dark:text-slate-300">A little context <span className="font-normal text-slate-400">(optional)</span></span><textarea rows={4} value={brief} onChange={e => setBrief(e.target.value)} placeholder="The problem, timeline, or current stage" className="w-full resize-none rounded-md border border-slate-200 bg-transparent px-4 py-3 text-sm leading-6 outline-none placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10" /></label>
              </div>
              {error && <p role="alert" className="mt-4 text-xs leading-5 text-rose-600 dark:text-rose-400">{error}</p>}
              <button type="submit" disabled={submitting} className="mt-6 rounded-md bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100">{submitting ? 'Sending request…' : 'Request this time'}</button>
              <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">We’ll confirm availability by email. No sales pressure.</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoveryModal;
