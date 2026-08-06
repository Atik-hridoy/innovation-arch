'use client';

export function CTA() {
  return (
    <section className="relative w-full h-[600px] flex flex-col justify-center items-center overflow-hidden border-t border-white/5 z-10">
      
      {/* Reflective Neon Stage Gates */}
      <div className="absolute inset-y-0 left-[10%] w-[2px] bg-gradient-to-b from-primary/40 via-primary to-transparent shadow-[0_0_30px_rgba(221,183,255,0.8)] pointer-events-none"></div>
      <div className="absolute inset-y-0 right-[10%] w-[2px] bg-gradient-to-b from-primary/40 via-primary to-transparent shadow-[0_0_30px_rgba(221,183,255,0.8)] pointer-events-none"></div>
      
      {/* Portal Floor Reflection */}
      <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-primary/10 to-transparent blur-md opacity-70 pointer-events-none"></div>

      <div className="relative z-20 flex flex-col items-center text-center px-margin-edge w-full max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-bold tracking-tighter leading-tight drop-shadow-2xl">
            Ready to build the next <br />great <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">digital product?</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80">
            Let's turn your idea into a product people love.
          </p>
        </div>

        <div className="pt-4">
          <a className="btn-glass relative inline-flex items-center justify-center font-body-md text-body-md font-bold text-on-surface bg-white/[0.03] backdrop-blur-[20px] border border-white/15 px-10 py-5 rounded-full overflow-hidden hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:shadow-[0_0_30px_rgba(221,183,255,0.4)] transition-all duration-300 group cursor-pointer" href="#">
            LET'S BUILD TOGETHER
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform ml-2">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
