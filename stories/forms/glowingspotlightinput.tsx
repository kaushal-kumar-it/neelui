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
        backgroundImage: `radial-gradient(circle at ${point.x}% ${point.y}%, rgba(217, 70, 239, 0.35), transparent 40%)`,
      }}
    >
      <input
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-fuchsia-500/60"
        placeholder={placeholder}
      />
    </div>
  );
};
