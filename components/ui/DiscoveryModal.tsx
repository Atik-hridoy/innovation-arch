'use client';

import { useEffect, useMemo, useState } from 'react';
import { CONFIG } from '@/lib/config';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-950/70 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative mx-auto w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0b0e13]"
      >
        {/* Sticky Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-30 grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 backdrop-blur-md transition-colors hover:text-slate-950 dark:border-white/10 dark:bg-[#0b0e13]/90 dark:hover:text-white active:scale-95"
          aria-label="Close booking dialog"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {success ? (
          <div className="mx-auto flex min-h-[460px] max-w-md flex-col items-center justify-center p-6 text-center">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <p className="mt-5 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Request received
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              We’ll confirm by email shortly.
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Your requested session is for <strong className="text-slate-900 dark:text-white">{dateLabel}</strong> at <strong className="text-slate-900 dark:text-white">{selectedTime}</strong>. We will send the Google Meet invitation to your email.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-slate-950 px-6 py-3 text-xs font-semibold text-white dark:bg-white dark:text-slate-950 active:scale-98"
            >
              Close this window
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr]">
            
            {/* Calendar & Time Section */}
            <section className="border-b border-slate-200 bg-slate-50/70 p-5 sm:p-7 dark:border-white/10 dark:bg-white/[0.025] lg:border-b-0 lg:border-r">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                30-min discovery call
              </span>
              <h2 id="booking-title" className="mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Choose a time that suits you.
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                A focused discussion about your product goals, timeline, and whether we are the right team to help.
              </p>

              {/* Month & Day Picker */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 dark:border-white/10 dark:bg-[#0b0e13]">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-950 dark:text-white">
                    {visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={isCurrentMonth}
                      onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
                      className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-25 dark:hover:bg-white/5"
                      aria-label="Previous month"
                    >
                      <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
                      className="grid h-7 w-7 place-items-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                      aria-label="Next month"
                    >
                      <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 text-center text-[9px] font-mono font-bold uppercase text-slate-400 mb-1.5">
                  {DAYS.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }, (_, index) => (
                    <span key={`blank-${index}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const date = new Date(year, month, day);
                    const disabled = date < today;
                    const selected = date.getTime() === selectedDate.getTime();
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDay(day)}
                        className={`aspect-square min-h-[32px] sm:min-h-[36px] rounded-lg text-xs font-medium transition-colors ${
                          selected
                            ? 'bg-blue-600 text-white font-bold'
                            : disabled
                            ? 'text-slate-300 dark:text-slate-700'
                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Preferred time <span className="font-normal text-slate-400">· Asia/Dhaka</span>
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:text-slate-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Input Details Form */}
            <form onSubmit={submit} className="flex flex-col p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-2.5 text-xs">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">event</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {dateLabel} at {selectedTime}
                  </p>
                  <p className="text-[10px] text-slate-500">30 minutes · Video conference</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="modal-name" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="modal-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Vance"
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-base sm:text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Work Email
                  </label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-base sm:text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10"
                  />
                </div>

                <div>
                  <label htmlFor="modal-service" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    What are you looking to build?
                  </label>
                  <select
                    id="modal-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white dark:bg-[#0b0e13] px-3.5 py-2.5 text-base sm:text-sm outline-none focus:border-blue-600 dark:border-white/10"
                  >
                    {SERVICES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-brief" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Context <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="modal-brief"
                    rows={2}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Brief problem or current stage"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-base sm:text-sm leading-relaxed outline-none placeholder:text-slate-400 focus:border-blue-600 dark:border-white/10"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full rounded-xl bg-slate-950 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-98 disabled:opacity-60 dark:bg-white dark:text-slate-950"
              >
                {submitting ? 'Sending request…' : 'Request This Time'}
              </button>

              <p className="mt-2 text-center text-[10px] text-slate-400">
                We’ll confirm by email. No sales pressure.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoveryModal;
