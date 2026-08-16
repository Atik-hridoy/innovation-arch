'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../../lib/config';
import { Footer } from '@/components/Footer';
import TwistingRibbon from '@/components/ui/twisting-ribbon';
import { RadialGlowButton } from '@/components/ui/radial-glow-button';
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
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
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
    <section id="contact" className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-8 flex flex-col items-center justify-center overflow-hidden bg-transparent dark:bg-[#040406] text-white z-10 transition-colors duration-400">

      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">

        {/* 3D Twisting Ribbon Canvas flowing continuously behind Contact & Footer */}
        <TwistingRibbon className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-75" />

        {/* Core Spotlight Behind Text - Ultra Bright */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[100vw] lg:w-[80vw] max-w-[1200px] h-[450px] bg-[#1D9E75]/20 dark:bg-[#1D9E75]/40 rounded-[100%] blur-[100px] lg:blur-[140px] opacity-100 mix-blend-screen" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[10%] w-[80vw] lg:w-[60vw] max-w-[800px] h-[350px] bg-primary/15 dark:bg-primary/30 rounded-[100%] blur-[100px] lg:blur-[120px] opacity-90 mix-blend-screen" />
        
        {/* Mobile secondary glow behind the form */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[100vw] h-[400px] bg-[#1D9E75]/15 dark:bg-[#1D9E75]/30 rounded-[100%] blur-[100px] opacity-100 mix-blend-screen lg:hidden" />

        {/* Outline Typography Watermark - Dribbble Style */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[22vw] md:text-[13vw] font-black tracking-tighter whitespace-nowrap uppercase select-none pointer-events-none z-0 text-transparent"
          style={{
            WebkitTextStroke: '2px var(--contact-watermark, rgba(52, 211, 153, 0.15))'
          }}>
          Contact
        </div>

        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div ref={containerRef} className="relative z-20 w-full max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 flex flex-col gap-10 lg:gap-16">

        {/* --- Top Section: Context & Info --- */}
        <div className="w-full gsap-fade-up opacity-0">
          <SectionHeader
            eyebrow="GET IN TOUCH & COLLABORATE"
            title={
              <>
                LET'S BUILD <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 dark:from-white dark:via-rose-100 dark:to-rose-300">
                  THE FUTURE.
                </span>
              </>
            }
            description="Got a visionary project? Drop us a line. We turn ambitious ideas into high-impact digital reality."
            className="!mb-0"
          />
        </div>

        {/* --- Bottom Section: FAQs & Form Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Pills & FAQs */}
          <div className="lg:col-span-5 flex flex-col space-y-12">
            {faqs.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-bold text-white border-b border-emerald-500/20 dark:border-white/15 pb-4 mb-2">Frequently Asked Questions</h3>
                <div className="flex flex-col gap-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-emerald-950/30 dark:bg-white/[0.06] hover:bg-emerald-900/40 dark:hover:bg-white/[0.10] border border-white/12 dark:border-white/15 hover:border-emerald-400/40 dark:hover:border-emerald-400/50 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl shadow-sm">
                      <button 
                        onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors group/faq cursor-pointer"
                      >
                        <span className="font-semibold text-white text-sm group-hover/faq:text-emerald-400 transition-colors pr-4">{faq.question}</span>
                        <span className={`material-symbols-outlined text-emerald-300/60 dark:text-white/80 group-hover/faq:text-emerald-400 transition-transform duration-300 flex-shrink-0 ${openFaqId === faq.id ? 'rotate-180 text-emerald-400' : ''}`}>
                          keyboard_arrow_down
                        </span>
                      </button>
                      <div 
                        className={`px-6 text-sm text-emerald-100/80 dark:text-white/85 font-normal leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${openFaqId === faq.id ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- Right Column: Premium Form (Takes 7 columns) --- */}
          <div className="lg:col-span-7 w-full flex justify-end gsap-fade-up opacity-0">
            <div className="w-full max-w-2xl bg-emerald-950/35 dark:bg-[#0e0d16]/95 border border-white/15 dark:border-white/20 p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.2)] relative overflow-hidden group">

              {/* Hover Glow inside form */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D9E75]/15 dark:bg-[#1D9E75]/25 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <form className="relative z-10 flex flex-col space-y-6" onSubmit={handleSubmit}>
                
                {submitSuccess && (
                  <div className="bg-[#1D9E75]/25 border border-[#1D9E75]/60 text-emerald-300 px-5 py-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold backdrop-blur-md">
                    <span className="material-symbols-outlined text-[20px] text-emerald-400">check_circle</span>
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-500/25 border border-red-500/60 text-red-300 px-5 py-3.5 rounded-xl flex items-center gap-3 text-sm font-semibold backdrop-blur-md">
                    <span className="material-symbols-outlined text-[20px] text-red-400">error</span>
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-[11px] font-bold text-emerald-200/90 dark:text-white/85 uppercase tracking-[0.2em] ml-2">Your Name</label>
                    <input
                      type="text" id="name" name="name" placeholder="Your Name"
                      value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-emerald-950/40 dark:bg-white/[0.08] hover:bg-emerald-900/50 dark:hover:bg-white/[0.12] focus:bg-emerald-900/70 dark:focus:bg-white/[0.15] border border-white/15 dark:border-white/20 focus:border-emerald-400 text-white placeholder:text-emerald-300/40 dark:placeholder:text-white/45 py-4 px-5 rounded-2xl outline-none backdrop-blur-xl transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                      required
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-[11px] font-bold text-emerald-200/90 dark:text-white/85 uppercase tracking-[0.2em] ml-2">Email Address</label>
                    <input
                      type="email" id="email" name="email" placeholder="Your Email"
                      value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-emerald-950/40 dark:bg-white/[0.08] hover:bg-emerald-900/50 dark:hover:bg-white/[0.12] focus:bg-emerald-900/70 dark:focus:bg-white/[0.15] border border-white/15 dark:border-white/20 focus:border-emerald-400 text-white placeholder:text-emerald-300/40 dark:placeholder:text-white/45 py-4 px-5 rounded-2xl outline-none backdrop-blur-xl transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-[11px] font-bold text-emerald-200/90 dark:text-white/85 uppercase tracking-[0.2em] ml-2">Your Message</label>
                  <textarea
                    id="message" name="message" rows={5} placeholder="Tell us about your project..."
                    value={message} onChange={e => setMessage(e.target.value)}
                    className="w-full bg-emerald-950/40 dark:bg-white/[0.08] hover:bg-emerald-900/50 dark:hover:bg-white/[0.12] focus:bg-emerald-900/70 dark:focus:bg-white/[0.15] border border-white/15 dark:border-white/20 focus:border-emerald-400 text-white placeholder:text-emerald-300/40 dark:placeholder:text-white/45 py-4 px-5 rounded-2xl outline-none backdrop-blur-xl transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] resize-none"
                    required
                  ></textarea>
                </div>

                <div className="pt-2">
                  <RadialGlowButton
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full justify-center tracking-wider text-sm font-bold uppercase py-4"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    {!isSubmitting && <span className="material-symbols-outlined text-[18px] ml-1">send</span>}
                  </RadialGlowButton>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* --- Seamless Integrated Footer (No Split) --- */}
        <Footer />
      </div>
    </section>
  );
}
