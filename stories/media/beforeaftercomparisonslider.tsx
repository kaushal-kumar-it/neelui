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
        <Image src={beforeSrc} alt={`${alt} before`} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={afterSrc} alt={`${alt} after`} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="h-full w-0.5 bg-white" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-x-3 bottom-3"
        aria-label="Comparison slider"
      />
    </div>
  );
};
