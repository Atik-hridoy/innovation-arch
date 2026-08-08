'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
    );
  }, []);

  return (
    <section id="contact" className="relative w-full min-h-screen py-24 lg:py-32 flex items-center justify-center overflow-hidden bg-[#030303] border-t border-white/[0.03] z-10">

      {/* --- Premium Background Effects --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">

        {/* Core Spotlight Behind Text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[80vw] max-w-[1200px] h-[400px] bg-[#1D9E75]/30 rounded-[100%] blur-[140px] opacity-100 mix-blend-screen" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[60vw] max-w-[800px] h-[300px] bg-primary/20 rounded-[100%] blur-[120px] opacity-80 mix-blend-screen" />

        {/* Outline Typography Watermark - Dribbble Style */}
        <div className="absolute top-[-2%] left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tighter whitespace-nowrap uppercase select-none pointer-events-none z-0"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.03)'
          }}>
          Contact
        </div>

        {/* Cinematic Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div ref={containerRef} className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

        {/* --- Left Column: Context & Info (Takes 5 columns) --- */}
        <div className="lg:col-span-5 flex flex-col space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl text-white font-extrabold tracking-tighter leading-[1.1] drop-shadow-2xl opacity-0">
              Let's build <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">the future.</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 max-w-md leading-relaxed font-light opacity-0">
              Got a visionary project? Drop us a line. We turn ambitious ideas into digital reality.
            </p>
          </div>

          <div className="flex flex-col space-y-5 opacity-0">
            {/* Minimalist Contact Pills */}
            <a href="mailto:hello@innovativearch.com" className="group flex items-center gap-5 p-2 pr-6 bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#1D9E75]/30 rounded-full w-fit transition-all duration-500 backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-white/[0.03] group-hover:bg-[#1D9E75]/20 flex items-center justify-center transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                <span className="material-symbols-outlined text-white/60 group-hover:text-[#1D9E75] transition-colors">mail</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Email Us</span>
                <span className="text-white/90 font-medium tracking-wide">hello@innovativearch.com</span>
              </div>
            </a>

            <a href="tel:+8801234567890" className="group flex items-center gap-5 p-2 pr-6 bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.05] hover:border-[#1D9E75]/30 rounded-full w-fit transition-all duration-500 backdrop-blur-md">
              <div className="w-14 h-14 rounded-full bg-white/[0.03] group-hover:bg-[#1D9E75]/20 flex items-center justify-center transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                <span className="material-symbols-outlined text-white/60 group-hover:text-[#1D9E75] transition-colors">call</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Call Us</span>
                <span className="text-white/90 font-medium tracking-wide">+880 1234-567890</span>
              </div>
            </a>
          </div>
        </div>

        {/* --- Right Column: Premium Form (Takes 7 columns) --- */}
        <div className="lg:col-span-7 w-full flex justify-end opacity-0">
          <div className="w-full max-w-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group">

            {/* Hover Glow inside form */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D9E75]/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <form className="relative z-10 flex flex-col space-y-6" action="#" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Your Name</label>
                  <input
                    type="text" id="name" name="name" placeholder="Your Name"
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <input
                    type="email" id="email" name="email" placeholder="Your Email"
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">Your Message</label>
                <textarea
                  id="message" name="message" rows={5} placeholder="Tell us about your project..."
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.05] focus:border-[#1D9E75]/50 text-white placeholder-white/20 py-4 px-5 rounded-2xl outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-white hover:bg-gray-200 text-black font-extrabold tracking-wide py-5 rounded-2xl flex justify-center items-center gap-3 transition-all duration-300 group/btn shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1"
              >
                SEND MESSAGE
                <span className="material-symbols-outlined text-[20px] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">send</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
