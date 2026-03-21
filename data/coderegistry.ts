import { extendedComponentCode } from './coderegistry/extended';

export const componentCode = {
  typewriter: `
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  staticText: string;
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  staticText,
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  textColor = '#ffffff',
  fontSize = '3rem',
  fontFamily = '"Space Grotesk", "Fira Code", monospace',
  showCursor = true,
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(typingSpeed);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % words.length;
      const fullWord = words[i];

      if (isDeleting) {
        setText(fullWord.substring(0, text.length - 1));
        setDelta(deletingSpeed);
      } else {
        setText(fullWord.substring(0, text.length + 1));
        setDelta(typingSpeed);
      }

      if (!isDeleting && text === fullWord) {
        setIsDeleting(true);
        setDelta(pauseDuration);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, delta, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div style={{ fontFamily, fontSize, color: textColor, fontWeight: 'bold', lineHeight: '1.2' }}>
      <div>{staticText}</div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>{text}</span>

        {showCursor && (
          <span
            className="blinking-cursor"
            style={{
              display: 'inline-block',
              width: '0.08em',
              height: '1em',
              backgroundColor: textColor,
              marginLeft: '8px',
            }}
          />
        )}
      </div>

      <style>
        {\`
          .blinking-cursor {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        \`}
      </style>
    </div>
  );
};

  `,

  scramble: `
import React, { useState, useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  color?: string;
  size?: string;
  fontFamily?: string; 
  glow?: boolean;      
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  speed = 30, 
  color = '#ffffff', 
  size = '1rem',
  fontFamily = '"Space Grotesk", "Fira Code", monospace',
  glow = true
}) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      setDisplayText((prevText) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span
      style={{
        fontFamily: fontFamily,
        fontWeight: '600',
        color: color,
        fontSize: size,
        letterSpacing: '0.05em',
        textShadow: glow ? \`0 0 10px \${color}80, 0 0 20px \${color}40\` : 'none',
        transition: 'color 0.3s ease, text-shadow 0.3s ease',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        display: 'inline-block',
      }}
    >
      {displayText}
    </span>
  );
};

  `,

  filltext: `
import React, { useState, useEffect } from 'react';

interface FillTextProps {
  text: string;
  baseColor?: string;
  fillColor?: string;
  size?: string;
  fontFamily?: string;
  duration?: number;
}

export const FillText: React.FC<FillTextProps> = ({
  text,
  baseColor = '#ffb3c6',
  fillColor = '#ff0054',
  size = '6rem',
  fontFamily = '"Arial Black", "Impact", sans-serif',
  duration = 3000,
}) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFilled(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const rawSvg = \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none"><path d="M0 0 L100 0 Q130 25 100 50 T100 100 Q130 125 100 150 T100 200 L0 200 Z" fill="\${fillColor}"/></svg>\`;

  const waveSvg = \`data:image/svg+xml,\${encodeURIComponent(rawSvg)}\`;

  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily,
        fontSize: size,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        
        backgroundImage: \`url('\${waveSvg}'), linear-gradient(\${baseColor}, \${baseColor})\`,

        backgroundSize: '200% 200%, 100% 100%',
        backgroundRepeat: 'repeat-y, no-repeat',

        backgroundPosition: isFilled ? '0% 400%, 0% 0%' : '100% 0%, 0% 0%',
        transition: isFilled ? \`background-position \${duration}ms cubic-bezier(0.25, 1, 0.5, 1)\` : 'none',

        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

  `,

  dotExpand: `
'use client';

import React from 'react';

interface DotExpandButtonProps {
  text: string;
}

export const DotExpandButton: React.FC<DotExpandButtonProps> = ({ text }) => {
  return (
    <button className="group flex items-center gap-3 rounded-full bg-zinc-900 px-6 py-3 font-semibold text-zinc-300 transition-colors duration-300 hover:bg-white hover:text-black active:scale-95 hover:cursor-pointer">

      <div className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:bg-black" />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute h-4 w-4 -translate-x-3 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {text}
      </span>

    </button>
  );
};

  `,

  glowingBorder: `
'use client';

import React from 'react';

interface GlowingBorderButtonProps {
  text: string;
  onClick?: () => void;
  gradientColors?: string;
  innerBgColor?: string;
  textColor?: string;
  borderWidth?: string;
  spinDuration?: string;
  padding?: string;
  rounded?: string;
}

export const GlowingBorderButton: React.FC<GlowingBorderButtonProps> = ({
  text,
  onClick,
  gradientColors = '#E2CBFF, #393BB2, #E2CBFF',
  innerBgColor = 'bg-zinc-950',
  textColor = 'text-white',
  borderWidth = '2px',
  spinDuration = '2s',
  padding = 'px-8 py-2',
  rounded = 'rounded-full',
}) => {
  return (
    <button
      onClick={onClick}
      className={\`relative inline-flex overflow-hidden focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-50 active:scale-95 transition-transform \${rounded}\`}
      style={{ padding: borderWidth }}
    >
      <span
        className="absolute inset-[-1000%] animate-spin"
        style={{
          background: \`conic-gradient(from 90deg at 50% 50%, \${gradientColors})\`,
          animationDuration: spinDuration,
        }}
      />

      <span
        className={\`inline-flex h-full w-full cursor-pointer items-center justify-center \${innerBgColor} \${padding} text-sm font-medium \${textColor} backdrop-blur-3xl transition-colors hover:bg-zinc-900 \${rounded}\`}
      >
        {text}
      </span>
    </button>
  );
};

  `,

  magnetic: `
'use client';

import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  text: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ text }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();

    const middleX = e.clientX - (left + width / 2);
    const middleY = e.clientY - (top + height / 2);

    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-full bg-white px-8 py-3 font-semibold text-black transition-all duration-200 ease-out hover:bg-zinc-200 hover:cursor-pointer"
      style={{
        transform: \`translate(\${position.x}px, \${position.y}px)\`,
      }}
    >
      {text}
    </button>
  );
};

  `,

  gradientCard: `
'use client';

import React from 'react';

interface GradientBorderCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColors?: string;
  animationSpeed?: string;
}

export const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  className = "p-8",
  gradientColors = "#00ffcc, #ff0054, #00ffcc",
  animationSpeed = "3s",
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-[2px] group">
      <span
        className="absolute inset-[-1000%] animate-spin"
        style={{
          background: \`conic-gradient(from 90deg at 50% 50%, \${gradientColors})\`,
          animationDuration: animationSpeed,
        }}
      />
      
      <div className={\`relative h-full w-full rounded-2xl bg-zinc-950 flex flex-col \${className}\`}>
        {children}
      </div>
    </div>
  );
};

  `,

  interactiveDotsFull: `
'use client';

import React, { useRef, useEffect } from 'react';

interface InteractiveDotsProps {
  dotColor?: string;
  lineColor?: string;
  bgColor?: string;
  density?: number;
  speed?: number;
  mouseInteractionRadius?: number;
  connectionRadius?: number;
}

export const InteractiveDots: React.FC<InteractiveDotsProps> = ({
  dotColor = '#00ffcc',
  lineColor = '#00ffcc',
  bgColor = '#000000',
  density = 300,
  speed = 1,
  mouseInteractionRadius = 150,
  connectionRadius = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0 || this.x >= width) this.vx *= -1;
        if (this.y <= 0 || this.y >= height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInteractionRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
          
          this.x -= forceDirectionX * force * 5;
          this.y -= forceDirectionY * force * 5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const calculatedDensity = Math.floor((canvas.width * canvas.height) / 15000) * (density / 100);
      for (let i = 0; i < calculatedDensity; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : '255, 255, 255';
      };
      const rgbLineColor = hexToRgb(lineColor);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRadius) {
            const opacity = 1 - distance / connectionRadius;
            ctx.beginPath();
            ctx.strokeStyle = \`rgba(\${rgbLineColor}, \${opacity})\`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    const startupTimer = setTimeout(() => {
      resizeCanvas();
      animate();
    }, 50);

    return () => {
      clearTimeout(startupTimer);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, lineColor, bgColor, density, speed, mouseInteractionRadius, connectionRadius]);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-auto" />
    </div>
  );
};

  `,

  starsBackgroundFull: `
"use client";
import React, { useEffect, useRef } from "react";
interface StarsBackgroundProps {
  speed?: number;
  density?: number;
}

export function StarsBackground({ speed = 0.5, density = 600 }: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const numStars = density;

    const stars: { x: number; y: number; z: number }[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 2000,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.x = Math.random() * 2000 - 1000;
          star.y = Math.random() * 2000 - 1000;
          star.z = 2000;
        }

        const px = (star.x / star.z) * canvas.width + canvas.width / 2;
        const py = (star.y / star.z) * canvas.height + canvas.height / 2;
        const radius = Math.max(0, (1 - star.z / 2000) * 2.5);

        if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      />
    );
}

  `,
spotlightGridFull: `
'use client';

import React, { useState } from 'react';

interface SpotlightGridProps {
  gridColor?: string;
  bgColor?: string;
  spotlightSize?: number;
  gridSize?: number;
}

export const SpotlightGrid: React.FC<SpotlightGridProps> = ({
  gridColor = 'rgba(255, 255, 255, 0.15)',
  bgColor = '#000000',
  spotlightSize = 400,
  gridSize = 40,
}) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-auto"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: \`linear-gradient(to right, \${gridColor} 1px, transparent 1px), linear-gradient(to bottom, \${gridColor} 1px, transparent 1px)\`,
          backgroundSize: \`\${gridSize}px \${gridSize}px\`,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{
          background: \`radial-gradient(circle \${spotlightSize}px at \${mousePos.x}px \${mousePos.y}px, transparent 0%, \${bgColor} 80%)\`,
        }}
      />
    </div>
  );
};`,
slidingTabsFull: `'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface SlidingTabsProps {
  tabs: Tab[];
  defaultActive?: string;
}

export const SlidingTabs: React.FC<SlidingTabsProps> = ({
  tabs,
  defaultActive,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0]?.id);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const activeElement = containerRef.current.querySelector(
      \`[data-id="\${activeTab}"]\`
    ) as HTMLElement | null;

    if (activeElement) {
      setPillStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center rounded-full bg-zinc-900/50 p-1 backdrop-blur-md border border-zinc-800"
    >
      <div
        className="absolute bottom-1 top-1 rounded-full bg-zinc-700 transition-all duration-300 ease-out z-0"
        style={pillStyle}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-id={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={\`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ease-out rounded-full \${
            activeTab === tab.id ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
          }\`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};`,
floatingDockFull: `'use client';

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
};`,
fluidNavFull: `'use client';

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
};`,  ...extendedComponentCode,
} as const;
