'use client';

import React, { useEffect, useState } from 'react';

interface DockItemProps {
  label: string;
  icon: React.ReactNode;
  href?: string;
}

interface FloatingDockProps {
  items: DockItemProps[];
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouchLike, setIsTouchLike] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const handleChange = () => setIsTouchLike(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      onMouseLeave={() => setActiveIndex(null)}
      className="flex h-14 md:h-16 max-w-full items-end gap-1.5 md:gap-2 rounded-2xl bg-zinc-950/80 px-2.5 md:px-3 pb-1.5 md:pb-2 backdrop-blur-md border border-zinc-800 shadow-2xl overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((item, idx) => (
        <DockIcon
          key={idx}
          item={item}
          isTouchLike={isTouchLike}
          isActive={activeIndex === idx}
          onActivate={() => {
            if (!isTouchLike) {
              setActiveIndex(idx);
            }
          }}
        />
      ))}
    </div>
  );
};

const DockIcon = ({
  item,
  isActive,
  onActivate,
  isTouchLike,
}: {
  item: DockItemProps;
  isActive: boolean;
  onActivate: () => void;
  isTouchLike: boolean;
}) => {
  const baseSize = isTouchLike ? 34 : 40;
  const size = baseSize * (isActive ? 1.18 : 1);

  return (
    <a
      href={item.href || '#'}
      aria-label={item.label}
      onMouseEnter={onActivate}
      style={{ width: size, height: size }}
      className="group relative shrink-0 flex items-center justify-center rounded-lg md:rounded-xl bg-zinc-800 transition-all duration-200 ease-out hover:bg-zinc-700 hover:cursor-pointer"
    >
      {!isTouchLike && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-zinc-900 border border-zinc-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
          {item.label}
        </span>
      )}

      <div className="text-zinc-400 transition-colors group-hover:text-white flex items-center justify-center w-full h-full">
        {item.icon}
      </div>
    </a>
  );
};