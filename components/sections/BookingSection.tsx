'use client';

import { useMemo, useState } from 'react';
import { createBooking } from '@/lib/api';

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
    try {
      await createBooking({
        name,
        email,
        project_type: project,
        preferred_date: selectedDate.toISOString().slice(0, 10),
        preferred_time: selectedTime,
        timezone: 'Asia/Dhaka',
        brief,
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="book" className="relative overflow-hidden border-t border-slate-200 bg-[#f4f6f8] py-14 sm:py-24 lg:py-32 dark:border-white/10 dark:bg-[#080b10]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="site-container">
        
        {/* Section Heading */}
        <div className="mb-8 sm:mb-12 grid gap-4 sm:gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <span className="inline-block font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Schedule a consultation
            </span>
            <h2 className="mt-3 text-balance text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.035em] sm:tracking-[-0.045em] text-slate-950 dark:text-white">
              A useful first conversation starts with context.
            </h2>
          </div>
          <p className="max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Choose a preferred date and time, then share what you are working on. We will review your context and confirm availability by email.
          </p>
        </div>

        {/* Booking Container: Mobile Stacked, Desktop 3-Column */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d1118]">
          <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr_380px]">
            
            {/* Step 0: Aside Info & Selection Pill */}
            <aside className="hidden xl:flex flex-col border-b border-slate-200 bg-slate-950 p-7 text-white dark:border-white/10 xl:border-b-0 xl:border-r">
              <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                Discovery session
              </div>

              <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-semibold tracking-tight">
                Product & technical consultation
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-400">
                A focused 30-minute introduction to understand your challenge, current stage, and the most useful next step.
              </p>

              <dl className="mt-6 space-y-3 sm:space-y-4 border-t border-white/10 pt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base text-blue-400">schedule</span>
                  <div>
                    <span className="text-[11px] text-slate-400">Duration: </span>
                    <span className="font-semibold text-slate-200">30 minutes</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base text-blue-400">videocam</span>
                  <div>
                    <span className="text-[11px] text-slate-400">Format: </span>
                    <span className="font-semibold text-slate-200">Google Meet / Video</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-base text-blue-400">language</span>
                  <div>
                    <span className="text-[11px] text-slate-400">Timezone: </span>
                    <span className="font-semibold text-slate-200">Asia / Dhaka (GMT+6)</span>
                  </div>
                </div>
              </dl>

              {/* Selection Summary Pill */}
              <div className="mt-6 rounded-xl border border-white/15 bg-white/[0.06] p-3 sm:p-4 xl:mt-auto">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-slate-400">
                  Selected Session
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{dateLabel}</span>
                  <span className="rounded-md bg-blue-600/30 border border-blue-400/40 px-2 py-0.5 text-xs font-mono font-bold text-blue-300">
                    {selectedTime}
                  </span>
                </div>
              </div>
            </aside>

            {/* Step 1: Calendar & Time Picker */}
            <div className="order-1 border-b border-slate-200 p-4 sm:p-7 md:p-8 dark:border-white/10 xl:order-none xl:border-b-0 xl:border-r">
              <div className="mb-5 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white xl:hidden"><div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-blue-300">30-minute discovery call</p><p className="mt-1 text-xs text-slate-300">Video · Asia/Dhaka</p></div><div className="text-right"><p className="text-xs font-semibold">{dateLabel}</p><p className="mt-1 text-[10px] text-blue-300">{selectedTime}</p></div></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                    Step 01 / Select Date
                  </p>
                  <h3 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {visibleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    disabled={isCurrentMonth}
                    onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
                    className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-25 active:scale-95 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                    aria-label="Previous month"
                  >
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
                    className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                    aria-label="Next month"
                  >
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Day Labels */}
              <div className="mt-5 sm:mt-6 grid grid-cols-7 text-center text-[9px] font-mono font-bold tracking-wider text-slate-400">
                {DAYS.map((day) => (
                  <span key={day} className="pb-2">
                    {day}
                  </span>
                ))}
              </div>

              {/* Day Grid with Touch Targets */}
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {Array.from({ length: firstDay }, (_, index) => (
                  <span key={`empty-${index}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                  const day = index + 1;
                  const candidate = new Date(year, month, day);
                  const disabled = candidate < today;
                  const selected = candidate.getTime() === selectedDate.getTime();
                  const isToday = candidate.getTime() === today.getTime();

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSelectedDate(candidate)}
                      aria-label={`${candidate.toLocaleDateString()}${selected ? ', selected' : ''}`}
                      className={`relative aspect-square min-h-[36px] sm:min-h-[40px] rounded-lg text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                        selected
                          ? 'bg-blue-600 text-white font-bold shadow-[0_4px_14px_rgba(37,99,235,.4)]'
                          : disabled
                          ? 'cursor-not-allowed text-slate-300 dark:text-slate-700'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5'
                      }`}
                    >
                      {day}
                      {isToday && !selected && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-white/10">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Preferred Time Slot
                  </p>
                  <span className="text-[10px] font-mono text-slate-400">GMT+6 Dhaka</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIMES.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg border px-2.5 py-2.5 sm:py-3 text-xs font-semibold transition-all active:scale-95 ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:text-slate-400 dark:hover:border-white/25'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Form with iOS-safe 16px inputs */}
            <form onSubmit={submit} className="order-2 flex min-h-full flex-col p-4 sm:p-7 md:p-8 xl:order-none">
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  Step 02 / Your Details
                </p>
                <h3 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Help us prepare.
                </h3>
              </div>

              {status === 'sent' ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <h3 className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    Request received!
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xs">
                    We will review your note and confirm your session for {dateLabel} at {selectedTime} by email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-5 space-y-3.5">
                    <div>
                      <label htmlFor="book-name" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Your Name
                      </label>
                      <input
                        id="book-name"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="e.g. Alex Vance"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900/50 px-3.5 py-3 text-base sm:text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:bg-white dark:border-white/10 dark:focus:border-blue-500 dark:focus:bg-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="book-email" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Work Email
                      </label>
                      <input
                        id="book-email"
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900/50 px-3.5 py-3 text-base sm:text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:bg-white dark:border-white/10 dark:focus:border-blue-500 dark:focus:bg-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="book-project" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Project Type
                      </label>
                      <select
                        id="book-project"
                        value={project}
                        onChange={(event) => setProject(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white dark:bg-slate-900 px-3.5 py-3 text-base sm:text-sm outline-none focus:border-blue-600 dark:border-white/10"
                      >
                        {PROJECTS.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="book-brief" className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        A Little Context <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        id="book-brief"
                        rows={3}
                        value={brief}
                        onChange={(event) => setBrief(event.target.value)}
                        placeholder="What challenge or timeline are you working through?"
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900/50 px-3.5 py-3 text-base sm:text-sm leading-relaxed outline-none placeholder:text-slate-400 focus:border-blue-600 focus:bg-white dark:border-white/10 dark:focus:border-blue-500 dark:focus:bg-slate-900"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="mt-3 text-xs text-rose-600 dark:text-rose-400">
                      We could not send the request. Please email hello@innovationark.co directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 px-5 text-sm font-semibold text-white shadow-md active:scale-98 transition-all hover:bg-blue-600 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-blue-100"
                  >
                    <span>{status === 'sending' ? 'Sending request…' : 'Request This Time'}</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>

                  <p className="mt-2.5 text-center text-[10px] leading-relaxed text-slate-400">
                    No commitment or pushy sales calls. Confirmation sent via email.
                  </p>
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
