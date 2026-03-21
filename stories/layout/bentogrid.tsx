'use client';

import React from 'react';

export interface BentoCard {
  id: string;
  title: string;
  description: string;
  className?: string;
}

interface BentoGridProps {
  cards: BentoCard[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ cards }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[140px]">
      {cards.map((card) => (
        <article
          key={card.id}
          className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-transform duration-300 hover:-translate-y-0.5 ${card.className ?? ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <h3 className="text-sm md:text-base font-bold text-white">{card.title}</h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{card.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
