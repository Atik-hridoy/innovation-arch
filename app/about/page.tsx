import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FounderProfile } from '@/components/sections/FounderProfile';
import { Process } from '@/components/sections/Process';

export const metadata: Metadata = {
  title: 'About — Innovation Ark',
  description: 'A product and engineering studio working across strategy, design, web, mobile, and practical AI systems.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-[#07090d] dark:text-white overflow-x-hidden">
      <Header />
      <main>
        {/* About Header */}
        <header className="site-container grid min-h-[48vh] sm:min-h-[60vh] items-end gap-6 sm:gap-10 pb-12 pt-28 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:pb-24">
          <div className="lg:col-span-8">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              About Innovation Ark
            </span>
            <h1 className="mt-3 sm:mt-5 text-balance text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] sm:leading-[0.98] tracking-[-0.04em] sm:tracking-[-0.05em]">
              A small, senior team for consequential product work.
            </h1>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-600 dark:text-slate-400 lg:col-span-4">
            We bring product strategy, interface design, and software engineering together under one roof so critical decisions never disappear between disciplines.
          </p>
        </header>

        {/* Workspace Photo */}
        <figure className="site-container relative aspect-[16/10] sm:aspect-[16/7] min-h-[220px] overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10">
          <img
            src="/images/modern_workspace.jpg"
            alt="Collaborative software engineering studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
        </figure>

        {/* Point of View Section */}
        <section className="section-shell">
          <div className="site-container grid gap-8 sm:gap-12 border-t border-slate-200 pt-8 sm:pt-12 dark:border-white/10 lg:grid-cols-12">
            <p className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 lg:col-span-3">
              Our point of view
            </p>
            <div className="grid gap-6 sm:gap-10 sm:grid-cols-2 lg:col-span-9">
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-5 sm:p-7">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Clarity is part of the craft.
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Good software execution begins with a shared understanding of the user, the business goal, the constraints, and the tradeoffs that matter most.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-5 sm:p-7">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  The product outlives the launch.
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  We value maintainable architectures, clean codebases, and useful documentation that give your future team confidence and agility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Process />
        <FounderProfile />
      </main>

      <div className="site-container">
        <Footer />
      </div>
    </div>
  );
}
