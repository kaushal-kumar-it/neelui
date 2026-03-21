export const extendedComponentCode = {
bentoGrid: `
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
          className={\`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-transform duration-300 hover:-translate-y-0.5 \${card.className ?? ''}\`}
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
};`,
infiniteScrollMarquee: `
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
        style={{ animationDuration: \`\${speedSeconds}s\` }}
      >
        {loopItems.map((item, index) => (
          <span
            key={\`\${item}-\${index}\`}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs md:text-sm text-zinc-300 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <style>{\`
        .marquee-track {
          animation: marquee var(--duration, 20s) linear infinite;
        }
        .marquee-track { --duration: \${speedSeconds}s; }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      \`}</style>
    </div>
  );
};`,
commandPalette: `
 'use client';

import React, { useEffect, useMemo, useState } from 'react';

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  onSelect?: () => void;
}

interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  items,
  placeholder = 'Search commands...',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isTrigger = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (isTrigger) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.subtitle?.toLowerCase().includes(lower)
    );
  }, [items, query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-left text-zinc-400 hover:cursor-pointer"
      >
        <span className="text-sm">Open command palette</span>
        <kbd className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-300">⌘K / Ctrl+K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-20" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              className="w-full border-b border-zinc-800 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        item.onSelect?.();
                        setOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-zinc-900 hover:cursor-pointer"
                    >
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                      {item.subtitle && <p className="text-xs text-zinc-400">{item.subtitle}</p>}
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-3 py-8 text-center text-sm text-zinc-500">No results found.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};`,
glowingSpotlightInput: `
 'use client';

import React, { useRef, useState } from 'react';

interface GlowingSpotlightInputProps {
  placeholder?: string;
}

export const GlowingSpotlightInput: React.FC<GlowingSpotlightInputProps> = ({
  placeholder = 'Type something magical...',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 50 });

  return (
    <div
      ref={wrapperRef}
      onMouseMove={(event) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPoint({ x, y });
      }}
      className="relative w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-1"
      style={{
        backgroundImage: \`radial-gradient(circle at ${'${point.x}'}% ${'${point.y}'}%, rgba(217, 70, 239, 0.35), transparent 40%)\`,
      }}
    >
      <input
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-fuchsia-500/60"
        placeholder={placeholder}
      />
    </div>
  );
};`,
stickyScrollReveal: `
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
          <article key={\`${'${section.title}'}-${'${index}'}\`} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 min-h-36">
            <p className="text-xs text-zinc-500">Step {index + 1}</p>
            <h4 className="mt-2 text-lg font-semibold text-zinc-100">{section.title}</h4>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{section.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};`,
stackedToastNotifications: `
 'use client';

import React, { useState } from 'react';

interface ToastItem {
  id: number;
  title: string;
  message: string;
}

export const StackedToastNotifications: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const createToast = () => {
    const id = Date.now();
    const newToast: ToastItem = {
      id,
      title: 'Update complete',
      message: 'Your settings were saved successfully.',
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 4));
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  return (
    <div className="relative w-full min-h-64 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
      <button
        onClick={createToast}
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 hover:cursor-pointer"
      >
        Trigger Toast
      </button>

      <div className="pointer-events-none absolute right-4 top-16 flex w-[min(90vw,22rem)] flex-col gap-2">
        {toasts.map((toast, index) => (
          <article
            key={toast.id}
            className="pointer-events-auto rounded-xl border border-zinc-700 bg-zinc-900/95 p-3 shadow-xl"
            style={{
              transform: \`translateY(${ '${index * 6}' }px) scale(${ '${1 - index * 0.04}' })\`,
              opacity: 1 - index * 0.12,
            }}
          >
            <h4 className="text-sm font-semibold text-zinc-100">{toast.title}</h4>
            <p className="mt-1 text-xs text-zinc-400">{toast.message}</p>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== toast.id))}
              className="mt-2 text-xs text-cyan-300 hover:text-cyan-200 hover:cursor-pointer"
            >
              Dismiss
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};`,
wordByWordScrollReveal: `
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
          <span key={\`${'${word}'}-${'${index}'}\`} className={\`transition-colors duration-300 ${'${visible ? \'text-white\' : \'text-zinc-700\''}'}\`}>
            {word}{' '}
          </span>
        );
      })}
    </div>
  );
};`,
animatedNumberCounter: `
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
};`,
beforeAfterComparisonSlider: `
 'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BeforeAfterComparisonSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}

export const BeforeAfterComparisonSlider: React.FC<BeforeAfterComparisonSliderProps> = ({
  beforeSrc,
  afterSrc,
  alt = 'Comparison image',
}) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      <div className="relative h-56 md:h-72 w-full">
        <Image src={beforeSrc} alt={\`${'${alt}'} before\`} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
      </div>

      <div className="absolute inset-0" style={{ clipPath: \`inset(0 ${'${100 - position}'}% 0 0)\` }}>
        <Image src={afterSrc} alt={\`${'${alt}'} after\`} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: \`${'${position}'}%\` }}>
        <div className="h-full w-0.5 bg-white" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-x-3 bottom-3 cursor-ew-resize"
        aria-label="Comparison slider"
      />
    </div>
  );
};`,
magneticCustomCursor: `
 'use client';

import React, { useState } from 'react';

interface MagneticCustomCursorProps {
  children: React.ReactNode;
}

export const MagneticCustomCursor: React.FC<MagneticCustomCursorProps> = ({ children }) => {
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });

  return (
    <div
      className="relative w-full cursor-none"
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, active: true })}
      onMouseLeave={() => setCursor((value) => ({ ...value, active: false }))}
    >
      {children}
      <span
        className="pointer-events-none fixed z-50 hidden md:block rounded-full border border-fuchsia-400/60 bg-fuchsia-500/10 backdrop-blur-sm transition-transform duration-150"
        style={{
          width: cursor.active ? 44 : 26,
          height: cursor.active ? 44 : 26,
          transform: \`translate(${ '${cursor.x - (cursor.active ? 22 : 13)}' }px, ${ '${cursor.y - (cursor.active ? 22 : 13)}' }px)\`,
          opacity: cursor.active ? 1 : 0,
        }}
      />
    </div>
  );
};`
} as const;
