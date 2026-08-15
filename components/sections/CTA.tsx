'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../../lib/config';

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
    <section id="contact" className="relative w-full min-h-screen py-24 lg:py-32 flex items-center justify-center overflow-hidden bg-[#030303] border-t border-white/[0.03] z-10">

      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">

        {/* Core Spotlight Behind Text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[100vw] lg:w-[80vw] max-w-[1200px] h-[400px] bg-[#1D9E75]/30 rounded-[100%] blur-[100px] lg:blur-[140px] opacity-100 mix-blend-screen" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[80vw] lg:w-[60vw] max-w-[800px] h-[300px] bg-primary/20 rounded-[100%] blur-[100px] lg:blur-[120px] opacity-80 mix-blend-screen" />
        
        {/* Mobile secondary glow behind the form */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[100vw] h-[400px] bg-[#1D9E75]/20 rounded-[100%] blur-[100px] opacity-100 mix-blend-screen lg:hidden" />

        {/* Outline Typography Watermark - Dribbble Style */}
        <div className="absolute top-[2%] md:top-[-2%] left-1/2 -translate-x-1/2 text-[25vw] md:text-[14vw] font-black tracking-tighter whitespace-nowrap uppercase select-none pointer-events-none z-0"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.05)'
          }}>
          Contact
        </div>

        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div ref={containerRef} className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col gap-12 lg:gap-20 pt-10">

        {/* --- Top Section: Context & Info --- */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white font-extrabold tracking-tighter leading-[1.1] drop-shadow-2xl gsap-fade-up opacity-0">
              Let's build <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">the future.</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-md leading-relaxed font-light gsap-fade-up opacity-0">
              Got a visionary project? Drop us a line. We turn ambitious ideas into digital reality.
            </p>
          </div>
        </div>

        {/* --- Bottom Section: FAQs & Form Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column: Pills & FAQs */}
          <div className="lg:col-span-5 flex flex-col space-y-12">
            


            {faqs.length > 0 && (
              <div className="flex flex-col space-y-4">
                <h3 className="text-xl font-bold text-white/90 border-b border-white/10 pb-4 mb-2">Frequently Asked Questions</h3>
              <div className="flex flex-col gap-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors group/faq"
                    >
                      <span className="font-semibold text-white/90 text-sm group-hover/faq:text-primary transition-colors pr-4">{faq.question}</span>
                      <span className={`material-symbols-outlined text-primary/50 group-hover/faq:text-primary transition-transform duration-300 flex-shrink-0 ${openFaqId === faq.id ? 'rotate-180 text-primary' : ''}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    <div 
                      className={`px-6 text-sm text-white/60 font-light overflow-hidden transition-all duration-500 ease-in-out ${openFaqId === faq.id ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
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
          <div className="w-full max-w-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group">

            {/* Hover Glow inside form */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D9E75]/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <form className="relative z-10 flex flex-col space-y-6" onSubmit={handleSubmit}>
              
              {submitSuccess && (
                <div className="bg-[#1D9E75]/20 border border-[#1D9E75]/50 text-[#1D9E75] px-5 py-3 rounded-xl flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-5 py-3 rounded-xl flex items-center gap-3 text-sm">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Your Name</label>
                  <input
                    type="text" id="name" name="name" placeholder="Your Name"
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <input
                    type="email" id="email" name="email" placeholder="Your Email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Your Message</label>
                <textarea
                  id="message" name="message" rows={5} placeholder="Tell us about your project..."
                  value={message} onChange={e => setMessage(e.target.value)}
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-white hover:bg-gray-200 disabled:opacity-50 text-black font-extrabold tracking-wide py-5 rounded-2xl flex justify-center items-center gap-3 transition-all duration-300 group/btn shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                {!isSubmitting && <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">send</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
