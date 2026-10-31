'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../../lib/config';
import { Footer } from '@/components/Footer';
import { LocationMapSection } from '@/components/sections/LocationMapSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

const DEFAULT_FAQS: FAQ[] = [
  {
    id: 1,
    question: 'How quickly can we kick off a project?',
    answer: 'Typically within 1 to 2 weeks following our initial discovery session. We prioritize immediate architectural clarity so development starts without delays.',
    order: 1,
  },
  {
    id: 2,
    question: 'How do you structure product pricing and engagement?',
    answer: 'We work either on fixed-scope milestone deliverables or as a dedicated senior technical team on monthly sprint retainers. Every deliverable is clearly scoped in advance.',
    order: 2,
  },
  {
    id: 3,
    question: 'Do we own the full intellectual property and source code?',
    answer: 'Yes, 100%. All source code, design assets, database schemas, and documentation are transferred to your organization upon milestone completion.',
    order: 3,
  },
  {
    id: 4,
    question: 'Do you provide post-launch maintenance and support?',
    answer: 'Yes, we provide ongoing SLA support, feature evolution, performance monitoring, and server maintenance so your application scales smoothly.',
    order: 4,
  },
];

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Failed to send message.');

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const animateElements = containerRef.current.querySelectorAll('.gsap-fade-up');
    if (animateElements.length > 0) {
      gsap.fromTo(
        animateElements,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }

    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/faqs/`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setFaqs(data.sort((a: FAQ, b: FAQ) => a.order - b.order));
          }
        }
      } catch (err) {
        // Keep default FAQs
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="contact" className="relative w-full pt-10 sm:pt-16 md:pt-20 pb-6 flex flex-col items-center justify-center overflow-hidden bg-transparent text-slate-900 dark:text-white z-10 transition-colors duration-300">

      <div ref={containerRef} className="relative z-20 w-full max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col gap-8 sm:gap-12 lg:gap-16">

        {/* Section Header */}
        <div className="w-full gsap-fade-up opacity-0">
          <SectionHeader
            eyebrow="Contact"
            title="Let's talk about what you're building."
            description="Share your vision, the technical challenge, and where you want to go. We'll reply within 24 hours with a thoughtful next step."
            className="!mb-0"
          />
        </div>

        {/* FAQs & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* FAQs Accordion */}
          <div className="order-2 flex flex-col space-y-4 lg:order-1 lg:col-span-5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2.5">
              Frequently Asked Questions
            </h3>
            
            <div className="flex flex-col gap-2">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <button 
                    type="button"
                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left cursor-pointer min-h-[48px]"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm pr-3">
                      {faq.question}
                    </span>
                    <span
                      className={`material-symbols-outlined text-slate-400 dark:text-slate-500 transition-transform duration-200 shrink-0 ${
                        openFaqId === faq.id ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                      }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>

                  <div 
                    className={`px-4 sm:px-5 text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed overflow-hidden transition-all duration-300 ${
                      openFaqId === faq.id ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="order-1 flex w-full justify-end opacity-0 gsap-fade-up lg:order-2 lg:col-span-7">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-8 md:p-10 rounded-2xl shadow-md relative overflow-hidden transition-colors duration-300">
              <div className="mb-4">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Direct Enquiry
                </span>
                <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Send a quick message
                </h4>
              </div>

              <form className="relative z-10 flex flex-col space-y-4" onSubmit={handleSubmit}>
                {submitSuccess && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">check_circle</span>
                    Message sent successfully! We will reach out shortly.
                  </div>
                )}

                {submitError && (
                  <div className="bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <span className="material-symbols-outlined text-base text-rose-600 dark:text-rose-400">error</span>
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="cta-name" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-0.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      placeholder="Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-3.5 rounded-xl outline-none text-base sm:text-xs transition-colors"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="cta-email" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-0.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-3.5 rounded-xl outline-none text-base sm:text-xs transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="cta-message" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-0.5">
                    Your Message
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your product or business goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-3.5 rounded-xl outline-none text-base sm:text-xs transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider bg-slate-950 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl shadow-xs active:scale-98 transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Global HQ Location Map Section */}
        <LocationMapSection />

        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}

export default CTA;
