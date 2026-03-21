'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberCounterProps {
  target: number;
  label?: string;
  durationMs?: number;
  suffix?: string;
}

export const AnimatedNumberCounter: React.FC<AnimatedNumberCounterProps> = ({
  target,
  label,
  durationMs = 1200,
  suffix = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();

        const tick = (time: number) => {
          const elapsed = time - start;
          const ratio = Math.min(1, elapsed / durationMs);
          setValue(Math.floor(target * ratio));
          if (ratio < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [durationMs, target]);

  return (
    <div ref={ref} className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 text-center">
      <p className="text-3xl md:text-5xl font-black text-white tabular-nums">
        {value.toLocaleString()}
        {suffix}
      </p>
      {label && <p className="mt-2 text-sm text-zinc-400">{label}</p>}
    </div>
  );
};
