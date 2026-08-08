'use client';

export function CTA() {
  return (
    <section className="relative w-full min-h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col justify-center items-center overflow-hidden border-t border-white/5 z-10">
      
      {/* ━━━ User Specified Background Image (/images/g.jpg) ━━━ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/images/g.jpg"
          alt="Let's Build Together Background"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-75 blur-sm"
        />
        {/* Dark Obsidian Blend Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/80" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-margin-edge w-full max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-on-surface font-bold tracking-tighter leading-tight drop-shadow-2xl">
            Ready to build the next <br className="hidden sm:block" />great <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">digital product?</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80">
            Let's turn your idea into a product people love.
          </p>
        </div>

        <div className="pt-4">
          <a className="btn-glass relative inline-flex items-center justify-center font-body-md text-body-md font-bold text-on-surface bg-white/[0.03] backdrop-blur-[20px] border border-white/15 px-6 py-4 sm:px-10 sm:py-5 rounded-full overflow-hidden hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:shadow-[0_0_30px_rgba(221,183,255,0.4)] transition-all duration-300 group cursor-pointer text-sm sm:text-base" href="#">
            LET'S BUILD TOGETHER
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
