'use client';

export function Process() {
  return (
    <section id="process" className="process-section relative py-stack-xl px-margin-edge border-t border-white/5 z-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-start items-start gap-6 mb-16">
        <span className="font-label-caps text-label-caps text-primary/70 block">OUR PROCESS</span>
        <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-[0.95] tracking-tighter max-w-xl">
          We follow an arc from idea to impact.
        </h2>
      </div>

      {/* Horizontal Wave Process Timeline */}
      <div className="w-full max-w-7xl mx-auto relative h-[320px] flex items-center justify-center overflow-visible mt-8">
        {/* Wave Path */}
        <svg className="absolute w-full h-full overflow-visible z-10" viewBox="0 0 1000 200" fill="none" preserveAspectRatio="none">
          <path
            className="process-path"
            d="M 40 100 Q 150 40 250 100 Q 380 180 500 100 Q 620 20 750 100 Q 880 170 960 100"
            stroke="url(#process-wave-grad)"
            strokeWidth="3.5"
            style={{ filter: 'drop-shadow(0 0 8px rgba(183,109,255,0.5))' }}
          />
          <defs>
            <linearGradient id="process-wave-grad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(132, 43, 210, 0.2)"></stop>
              <stop offset="50%" stopColor="#ddb7ff"></stop>
              <stop offset="100%" stopColor="rgba(132, 43, 210, 0.2)"></stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Staggered process steps */}
        <div className="absolute left-[5%] top-[10%] flex flex-col items-center z-20 group">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
          </div>
          <div className="text-center mt-3 w-40">
            <div className="text-[10px] text-primary uppercase font-bold">01 / DISCOVER</div>
            <div className="text-[9px] text-on-surface-variant/70 mt-1">We understand your idea, goals & challenges.</div>
          </div>
        </div>

        <div className="absolute left-[27%] bottom-[5%] flex flex-col items-center z-20 group">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-lg">edit</span>
          </div>
          <div className="text-center mt-3 w-40">
            <div className="text-[10px] text-primary uppercase font-bold">02 / DESIGN</div>
            <div className="text-[9px] text-on-surface-variant/70 mt-1">We craft intuitive UI/UX that users love.</div>
          </div>
        </div>

        <div className="absolute left-[50%] top-[10%] flex flex-col items-center z-20 group">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-lg">code</span>
          </div>
          <div className="text-center mt-3 w-40">
            <div className="text-[10px] text-primary uppercase font-bold">03 / DEVELOP</div>
            <div className="text-[9px] text-on-surface-variant/70 mt-1">We build scalable, secure & high-performance solutions.</div>
          </div>
        </div>

        <div className="absolute left-[72%] bottom-[5%] flex flex-col items-center z-20 group">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-lg">rocket_launch</span>
          </div>
          <div className="text-center mt-3 w-40">
            <div className="text-[10px] text-primary uppercase font-bold">04 / LAUNCH</div>
            <div className="text-[9px] text-on-surface-variant/70 mt-1">We deploy and ensure a smooth go-live.</div>
          </div>
        </div>

        <div className="absolute right-[5%] top-[10%] flex flex-col items-center z-20 group">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
          </div>
          <div className="text-center mt-3 w-40">
            <div className="text-[10px] text-primary uppercase font-bold">05 / GROW</div>
            <div className="text-[9px] text-on-surface-variant/70 mt-1">We optimize, automate & help you grow.</div>
          </div>
        </div>

      </div>
    </section>
  );
}
