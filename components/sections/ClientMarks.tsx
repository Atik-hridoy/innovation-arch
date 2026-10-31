'use client';

const MARKS = [
  { name: 'BoiKhoj', descriptor: 'Book marketplace platform', image: '/images/boikhoj_mockup.jpg', link: '/#work' },
  { name: 'Voyanta', descriptor: 'Global travel experience', image: '/images/voyanta_mockup.jpg', link: '/#work' },
  { name: 'Mettro Bazar', descriptor: 'Modern commerce system', image: '/images/mettro_bazar_mockup.jpg', link: '/#work' },
];

export function ClientMarks() {
  return (
    <section aria-label="Selected product collaborations" className="border-y border-slate-200/70 bg-white py-6 sm:py-8 transition-colors dark:border-white/10 dark:bg-[#07090d]">
      <div className="site-container grid gap-5 sm:gap-7 lg:grid-cols-[220px_1fr] lg:items-center">
        <div>
          <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Selected product work
          </p>
          <p className="mt-1 sm:mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Products we have helped shape, design, and engineer.
          </p>
        </div>

        {/* Mobile Horizontal / Responsive Grid */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
          {MARKS.map((mark) => (
            <a
              key={mark.name}
              href={mark.link}
              className="group relative flex min-w-[78vw] snap-center items-center gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition-all hover:bg-slate-100/80 hover:border-blue-400/50 active:scale-98 dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] sm:min-w-0 sm:p-4"
            >
              <img
                src={mark.image}
                alt=""
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg object-cover opacity-80 transition duration-300 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 truncate">
                  {mark.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {mark.descriptor}
                </p>
              </div>
              <span className="material-symbols-outlined text-sm text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                arrow_forward
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientMarks;
