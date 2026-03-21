'use client';

import React, { useEffect, useRef, useState } from 'react';

interface WordByWordScrollRevealProps {
  text: string;
}

export const WordByWordScrollReveal: React.FC<WordByWordScrollRevealProps> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.9;
      const end = viewport * 0.2;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 md:p-6 leading-relaxed text-lg md:text-2xl font-semibold">
      {words.map((word, index) => {
        const threshold = (index + 1) / words.length;
        const visible = progress >= threshold;
        return (
          <span key={`${word}-${index}`} className={`transition-colors duration-300 ${visible ? 'text-white' : 'text-zinc-700'}`}>
            {word}{' '}
          </span>
        );
      })}
    </div>
  );
};
