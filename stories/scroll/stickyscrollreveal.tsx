'use client';

import React from 'react';

export interface StickySection {
  title: string;
  description: string;
}

interface StickyScrollRevealProps {
  sections: StickySection[];
}

export const StickyScrollReveal: React.FC<StickyScrollRevealProps> = ({ sections }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="md:sticky md:top-6 h-fit rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Sticky Panel</p>
        <h3 className="mt-2 text-xl font-bold text-white">Scroll to reveal content</h3>
        <p className="mt-3 text-sm text-zinc-400">
          Left side stays fixed on desktop while right-side cards continue scrolling.
        </p>
      </div>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <article key={`${section.title}-${index}`} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 min-h-36">
            <p className="text-xs text-zinc-500">Step {index + 1}</p>
            <h4 className="mt-2 text-lg font-semibold text-zinc-100">{section.title}</h4>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{section.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
