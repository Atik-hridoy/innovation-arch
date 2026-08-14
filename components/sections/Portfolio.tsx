'use client';

import { useState, useEffect } from 'react';
import { CONFIG } from '../../lib/config';
import { BooksShowcase, BookCfg } from '../ui/books-showcase';
import { MOCK_BOOKS } from '../../data/mock-books';

export function Portfolio() {
  const [books, setBooks] = useState<BookCfg[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (process.env.NODE_ENV === 'development') {
          setBooks(MOCK_BOOKS);
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${CONFIG.API_BASE_URL}/projects/`);
        if (!res.ok) throw new Error('Failed to load projects');
        
        const data = await res.json();
        if (data && data.length > 0) {
          const mappedBooks: BookCfg[] = data.map((apiProj: any) => {
            const mockups = [
              apiProj.mockup_1, 
              apiProj.mockup_2, 
              apiProj.mockup_3, 
              apiProj.mockup_4
            ].filter(Boolean);
            
            if (mockups.length === 0) mockups.push(CONFIG.FALLBACK_IMAGE);

            return {
              id: apiProj.id.toString(),
              title: apiProj.title || 'Untitled Project',
              subtitle: apiProj.subtitle || 'Category',
              metricLabel: apiProj.metric_label || 'Metric',
              metricValue: apiProj.metric_value || '-',
              desc: apiProj.description || 'No description provided.',
              tags: apiProj.tags || [],
              images: {
                front: mockups[0],
                back: mockups[1],
                spine: mockups[2],
              },
            };
          });
          setBooks(mappedBooks);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error("Failed to fetch projects from backend:", err);
        setError("Unable to load projects at this time.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  return (
    <section id="work" className="relative py-12 md:py-stack-xl z-10 bg-[#070609] overflow-hidden min-h-screen flex flex-col">
      {isLoading ? (
        <div className="w-full flex items-center justify-center flex-1 min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-white/50">
            <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
            <p className="font-mono text-sm tracking-widest">LOADING PROJECTS...</p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full flex items-center justify-center flex-1 min-h-[400px]">
          <div className="border border-red-500/20 bg-red-500/5 rounded-3xl p-10 flex flex-col items-center gap-4 text-center max-w-md backdrop-blur-md">
            <span className="material-symbols-outlined text-red-400 text-5xl">warning</span>
            <h3 className="text-xl font-bold text-white">Oops! Connection Failed</h3>
            <p className="text-sm text-white/50">{error}</p>
          </div>
        </div>
      ) : books.length === 0 ? (
        <div className="w-full flex items-center justify-center flex-1 min-h-[400px]">
          <div className="border border-white/5 bg-white/[0.02] rounded-3xl p-10 flex flex-col items-center gap-4 text-center max-w-md backdrop-blur-md">
            <span className="material-symbols-outlined text-white/20 text-5xl">folder_off</span>
            <h3 className="text-xl font-bold text-white">No Projects Found</h3>
            <p className="text-sm text-white/50">There are currently no case studies available to display. Please add some from the admin dashboard.</p>
          </div>
        </div>
      ) : (
        <div className="w-full relative">
           <BooksShowcase 
             books={books} 
             heroTitle="Real projects." 
             navTitle="FEATURED WORK"
             themeColors={{
               bg: '#070609',
               bgLight: '#070609',
               bgDark: '#070609',
               foregroundLight: '#ffffff',
               foregroundDark: '#ffffff'
             }}
           />
        </div>
      )}

      {/* Metrics Grid Footer Row */}
      <div className="scroll-reveal w-full max-w-7xl mx-auto rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-4 sm:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-8 mt-8 md:mt-16 items-center relative z-20">
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
