'use client';

export function Portfolio() {
  return (
    <section id="work" className="relative py-stack-xl px-margin-edge border-t border-white/5 z-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-start items-start gap-6 mb-16">
        <span className="font-label-caps text-label-caps text-primary/70 block">FEATURED WORK</span>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-[0.95] tracking-tighter">
          Real projects. Real impact.
        </h2>
      </div>

      {/* Case Study Card */}
      <div className="scroll-reveal w-full max-w-7xl mx-auto rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
        {/* Volumetric background glow */}
        <span className="absolute inset-0 bg-radial from-primary/5 to-transparent pointer-events-none"></span>

        {/* Left Mockup Showcase */}
        <div className="lg:col-span-6 flex justify-center items-center gap-6 relative">
          <div className="w-[180px] h-[360px] md:w-[220px] md:h-[440px] rounded-[30px] border-[6px] border-[#1a1a1a] shadow-2xl overflow-hidden transform -rotate-12 hover:rotate-0 transition-transform duration-500">
            <img className="w-full h-full object-cover select-none pointer-events-none" src="/images/wanderly_left.webp" alt="Wanderly left mobile screen" />
          </div>
          <div className="w-[180px] h-[360px] md:w-[220px] md:h-[440px] rounded-[30px] border-[6px] border-[#1a1a1a] shadow-[0_0_50px_rgba(221,183,255,0.1)] overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 z-10">
            <img className="w-full h-full object-cover select-none pointer-events-none" src="/images/wanderly_center.webp" alt="Wanderly center mobile screen" />
          </div>
        </div>

        {/* Right Description Details */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8 z-10">
          <div>
            <span className="font-label-caps text-label-caps text-primary/70 mb-3 block">FEATURED CASE STUDY</span>
            <h3 className="font-display-lg-mobile text-[32px] md:text-[48px] font-extrabold text-white leading-tight tracking-tight mb-2">Wanderly</h3>
            <p className="font-body-lg text-on-surface-variant max-w-lg">
              A complete travel discovery platform with booking, itinerary planning and real-time recommendations.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <span className="font-label-caps text-label-caps text-primary px-4 py-2 rounded-full bg-primary/10 border border-primary/20">Flutter</span>
            <span className="font-label-caps text-label-caps text-primary px-4 py-2 rounded-full bg-primary/10 border border-primary/20">Firebase</span>
            <span className="font-label-caps text-label-caps text-primary px-4 py-2 rounded-full bg-primary/10 border border-primary/20">Maps API</span>
            <span className="font-label-caps text-label-caps text-primary px-4 py-2 rounded-full bg-primary/10 border border-primary/20">Payment</span>
          </div>

          {/* Action */}
          <div className="flex justify-between items-center w-full border-t border-white/10 pt-6">
            <a className="font-body-md text-primary font-bold hover:scale-105 transition-transform flex items-center gap-2" href="#">
              VIEW CASE STUDY
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
            <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant/50 select-none">
              <button className="material-symbols-outlined hover:text-white transition-colors">arrow_back</button>
              <span>02 / 04</span>
              <button className="material-symbols-outlined hover:text-white transition-colors">arrow_forward</button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid Row Box */}
      <div className="scroll-reveal w-full max-w-7xl mx-auto rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 grid grid-cols-2 md:grid-cols-5 gap-8 mt-12 items-center">
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">10+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Projects Delivered</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">5+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Happy Clients</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">2+</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Years of Experience</div>
        </div>
        <div>
          <div className="text-[32px] font-extrabold text-white leading-none">100%</div>
          <div className="text-[9px] uppercase tracking-wider text-on-surface-variant/60 mt-2 font-mono">Client Satisfaction</div>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-2 border-l border-white/10 pl-6 h-full justify-center">
          <span className="font-mono text-[9px] text-on-surface-variant/80 tracking-wide">Trusted by brands and startups worldwide.</span>
        </div>
      </div>
    </section>
  );
}
