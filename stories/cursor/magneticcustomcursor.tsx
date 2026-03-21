'use client';

import React, { useState } from 'react';

interface MagneticCustomCursorProps {
  children: React.ReactNode;
}

export const MagneticCustomCursor: React.FC<MagneticCustomCursorProps> = ({ children }) => {
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });

  return (
    <div
      className="relative w-full"
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY, active: true })}
      onMouseLeave={() => setCursor((value) => ({ ...value, active: false }))}
    >
      {children}
      <span
        className="pointer-events-none fixed z-50 hidden md:block rounded-full border border-fuchsia-400/60 bg-fuchsia-500/10 backdrop-blur-sm transition-transform duration-150"
        style={{
          width: cursor.active ? 44 : 26,
          height: cursor.active ? 44 : 26,
          transform: `translate(${cursor.x - (cursor.active ? 22 : 13)}px, ${cursor.y - (cursor.active ? 22 : 13)}px)`,
          opacity: cursor.active ? 1 : 0,
        }}
      />
    </div>
  );
};
