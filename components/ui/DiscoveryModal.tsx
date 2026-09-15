'use client';

import React, { useState, useEffect } from 'react';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscoveryModal({ isOpen, onClose }: DiscoveryModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'brief'>('schedule');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Mobile App');
  const [budget, setBudget] = useState('$5k - $15k');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 my-auto text-slate-900 dark:text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-blue-700 dark:text-blue-300 font-bold">
              30-Min Free Strategy Call
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white uppercase tracking-tight mt-2">
            Book Your Free Discovery Call
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Discuss your project goals, technical roadmap, and get a clear cost estimate with zero risk.
          </p>
        </div>

        {/* Option Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            📅 Instant Meeting Link
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('brief')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeTab === 'brief'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            📝 Submit Quick Brief
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'schedule' ? (
          <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-2xl">calendar_month</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Direct Calendly Booking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
                Pick a 30-minute time slot directly on our founder&apos;s calendar for a live technical scoping session.
              </p>
            </div>
            
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full sm:w-auto px-7 py-3 text-xs font-semibold uppercase tracking-wider bg-[#0f172a] hover:bg-black text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Open Calendly Schedule →
              </button>
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                Direct Founder Access
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">shield</span>
                Strict NDA Included
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">schedule</span>
                Instant Confirmation
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSuccess ? (
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-center font-bold text-xs">
                ✅ Thank you! We have received your inquiry and will reach out within 4 business hours.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-700 font-bold ml-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-700 font-bold ml-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-slate-700 font-bold ml-1">Service Required</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="Mobile App">Mobile App Development</option>
                      <option value="Web Platform">Custom Web Platform / SaaS</option>
                      <option value="AI Automation">AI & Workflow Automation</option>
                      <option value="Cloud Architecture">Cloud & IT Infrastructure</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono uppercase text-emerald-300 font-bold ml-1">Estimated Budget</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors"
                    >
                      <option value="<$5k">&lt; $5,000</option>
                      <option value="$5k - $15k">$5,000 - $15,000</option>
                      <option value="$15k - $30k">$15,000 - $30,000</option>
                      <option value="$30k+">$30,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-slate-700 font-bold ml-1">Project Brief</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the business problem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-blue-600 text-slate-900 rounded-xl px-4 py-2.5 text-xs outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center text-xs font-semibold uppercase tracking-wider bg-[#0f172a] hover:bg-black text-white py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer mt-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Brief for Free Audit →'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
