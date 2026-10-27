import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  ['01', 'Understand', 'We align on the business goal, users, constraints, and what success should look like.'],
  ['02', 'Define', 'We turn the brief into a clear product scope, technical approach, and delivery plan.'],
  ['03', 'Design', 'We shape the user journey and interface, testing important decisions before development.'],
  ['04', 'Build', 'We develop in focused increments, sharing progress and validating the product as it takes form.'],
  ['05', 'Launch and improve', 'We prepare the release, monitor the product, and prioritize the next useful improvements.'],
];

export function Process() {
  return (
    <section id="process" className="section-shell bg-slate-950 text-white dark:bg-[#0b0e13]">
      <div className="site-container">
        <SectionHeader eyebrow="How we work" title="A clear process, with decisions made in the open." description="Short feedback loops keep the work focused and give your team visibility from the first conversation through launch." />
        <div className="border-t border-white/15">
          {steps.map(([number, title, description]) => (
            <div key={number} className="grid gap-3 border-b border-white/15 py-7 sm:grid-cols-[5rem_14rem_1fr] sm:items-start sm:gap-6 md:py-9">
              <span className="text-xs font-medium text-blue-400">{number}</span>
              <h3 className="text-xl font-medium tracking-tight">{title}</h3>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
