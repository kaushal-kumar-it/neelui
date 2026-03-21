'use client';

import React from 'react';

interface InfiniteScrollMarqueeProps {
  items: string[];
  speedSeconds?: number;
}

export const InfiniteScrollMarquee: React.FC<InfiniteScrollMarqueeProps> = ({
  items,
  speedSeconds = 20,
}) => {
  const loopItems = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 py-4">
      <div
        className="marquee-track flex w-max items-center gap-3 md:gap-4 px-3"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {loopItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs md:text-sm text-zinc-300 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .marquee-track {
          animation: marquee var(--duration, 20s) linear infinite;
        }
        .marquee-track { --duration: ${speedSeconds}s; }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
