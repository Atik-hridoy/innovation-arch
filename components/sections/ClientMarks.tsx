const MARKS = [
  { name: 'BoiKhoj', descriptor: 'Book marketplace', image: '/images/boikhoj_mockup.jpg' },
  { name: 'Voyanta', descriptor: 'Travel platform', image: '/images/voyanta_mockup.jpg' },
  { name: 'Mettro Bazar', descriptor: 'Commerce platform', image: '/images/mettro_bazar_mockup.jpg' },
];

export function ClientMarks() {
  return (
    <section aria-label="Selected product collaborations" className="border-y border-slate-200/70 bg-white py-8 transition-colors dark:border-white/10 dark:bg-[#07090d] sm:py-10">
      <div className="site-container grid gap-7 lg:grid-cols-[220px_1fr] lg:items-center">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Selected product work</p><p className="mt-2 text-xs leading-5 text-slate-500">Products we have helped shape and build.</p></div>
        <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {MARKS.map(mark => (
            <a key={mark.name} href="#work" className="group relative flex min-h-24 items-center gap-4 overflow-hidden px-0 py-5 sm:px-6 sm:py-3">
              <img src={mark.image} alt="" className="h-12 w-12 rounded-md object-cover opacity-55 grayscale transition duration-500 group-hover:opacity-90 group-hover:grayscale-0" />
              <div><p className="text-lg font-semibold tracking-[-0.03em] text-slate-800 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">{mark.name}</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-400">{mark.descriptor}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientMarks;
