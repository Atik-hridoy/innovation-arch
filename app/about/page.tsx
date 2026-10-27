import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FounderProfile } from '@/components/sections/FounderProfile';
import { Process } from '@/components/sections/Process';

export const metadata: Metadata = { title: 'About — Innovation Ark', description: 'A product and engineering studio working across strategy, design, web, mobile, and practical AI systems.' };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-[#07090d] dark:text-white">
      <Header />
      <main>
        <header className="site-container grid min-h-[72vh] items-end gap-10 pb-20 pt-36 lg:grid-cols-12 lg:pb-28">
          <div className="lg:col-span-8"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-blue-600 dark:text-blue-400">About Innovation Ark</p><h1 className="mt-6 text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl lg:text-8xl">A small, senior team for consequential product work.</h1></div>
          <p className="max-w-md text-base leading-8 text-slate-600 dark:text-slate-400 lg:col-span-4">We bring product thinking, interface design, and software engineering together so important decisions do not disappear between disciplines.</p>
        </header>
        <figure className="site-container relative aspect-[16/7] min-h-72 overflow-hidden rounded-xl"><img src="/images/modern_workspace.jpg" alt="A collaborative software engineering workspace" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" /></figure>
        <section className="section-shell"><div className="site-container grid gap-12 border-t border-slate-200 pt-10 dark:border-white/10 lg:grid-cols-12"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-600 lg:col-span-3">Our point of view</p><div className="grid gap-10 sm:grid-cols-2 lg:col-span-9"><div><h2 className="text-2xl font-semibold tracking-tight">Clarity is part of the craft.</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">Good execution begins with a shared understanding of the user, business goal, constraints, and decisions that matter most.</p></div><div><h2 className="text-2xl font-semibold tracking-tight">The product outlives the launch.</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">We value maintainable systems, useful documentation, and choices that give the next team room to work.</p></div></div></div></section>
        <Process />
        <FounderProfile />
      </main>
      <div className="site-container"><Footer /></div>
    </div>
  );
}
