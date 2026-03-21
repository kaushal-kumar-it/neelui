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
};
