'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FluidNavItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface FluidNavProps {
  items: FluidNavItem[];
}

export const FluidNav: React.FC<FluidNavProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTouchLike, setIsTouchLike] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const handleChange = () => setIsTouchLike(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <nav
      onMouseLeave={() => {
        if (!isTouchLike) {
          setActiveId(null);
        }
      }}
      className="relative flex justify-center w-full"
    >
      <div className="flex w-full md:w-auto items-center justify-start md:justify-center gap-1.5 md:gap-2 rounded-full bg-zinc-900/50 px-2.5 md:px-4 py-1.5 md:py-2 backdrop-blur-md border border-zinc-800 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            onMouseEnter={() => {
              if (!isTouchLike) {
                setActiveId(item.id);
              }
            }}
            onClick={() => {
              if (isTouchLike) {
                setActiveId((current) => (current === item.id ? null : item.id));
              }
            }}
            className="shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:cursor-pointer"
            aria-expanded={activeId === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="absolute top-full pt-3 md:pt-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,30rem)] md:w-auto">
        <AnimatePresence mode="wait">
          {activeId && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              layout
              transition={{ type: "spring", mass: 0.5, stiffness: 400, damping: 30 }}
              className="w-full md:w-auto overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/50"
            >
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="p-4 md:p-6 max-h-[60vh] overflow-auto"
              >
                {items.find((item) => item.id === activeId)?.content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};