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
              transform: `translateY(${index * 6}px) scale(${1 - index * 0.04})`,
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
};
