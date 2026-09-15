'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../../lib/config';
import { Footer } from '@/components/Footer';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
      );
    }

    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/faqs/`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data.sort((a: FAQ, b: FAQ) => a.order - b.order));
        }
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <section id="contact" className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-8 flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white z-10 transition-colors duration-300">

      <div ref={containerRef} className="relative z-20 w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 flex flex-col gap-10 lg:gap-16">

        {/* Top Section */}
        <div className="w-full gsap-fade-up opacity-0">
          <SectionHeader
            eyebrow="GET IN TOUCH & COLLABORATE"
            title={
              <>
                LET&apos;S BUILD YOUR <br className="hidden sm:block" />
                <span className="text-blue-600">
                  NEXT SOLUTION.
                </span>
              </>
            }
            description="Got a project in mind? Drop us a line or schedule a free discovery call. We turn ambitious ideas into high-performance digital reality."
            className="!mb-0"
          />
        </div>

        {/* FAQs & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* FAQs */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {faqs.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 mb-1">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-2.5">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      <button 
                        onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <span className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm pr-3">{faq.question}</span>
                        <span className={`material-symbols-outlined text-slate-400 dark:text-slate-500 transition-transform duration-200 ${openFaqId === faq.id ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`}>
                          keyboard_arrow_down
                        </span>
                      </button>
                      <div 
                        className={`px-5 text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed overflow-hidden transition-all duration-300 ${openFaqId === faq.id ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-7 w-full flex justify-end gsap-fade-up opacity-0">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 rounded-2xl shadow-md relative overflow-hidden transition-colors duration-300">
              <form className="relative z-10 flex flex-col space-y-5" onSubmit={handleSubmit}>
                
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Your Name</label>
                    <input
                      type="text" id="name" name="name" placeholder="Alex Vance"
                      value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-4 rounded-xl outline-none text-xs transition-colors"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                    <input
                      type="email" id="email" name="email" placeholder="alex@company.com"
                      value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-4 rounded-xl outline-none text-xs transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="message" className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea
                    id="message" name="message" rows={4} placeholder="Tell us about your business goals..."
                    value={message} onChange={e => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 py-3 px-4 rounded-xl outline-none text-xs transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full justify-center text-xs font-semibold uppercase tracking-wider bg-[#0f172a] hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE →'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}
