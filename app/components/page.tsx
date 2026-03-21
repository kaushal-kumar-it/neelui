'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Showcase } from '../../stories/showcase/showcase';
import { TypewriterText } from '../../stories/texteffects/typewriter';
import { FillText } from '../../stories/texteffects/filltext';
import { ScrambleText } from '@/stories/texteffects/ScrambleText';
import { DotExpandButton } from '@/stories/buttons/dotexpandbutton';
import { GlowingBorderButton } from '@/stories/buttons/glowingborderbutton';
import { MagneticButton } from '@/stories/buttons/magneticbutton';
import { GradientBorderCard } from '@/stories/cards/gradientbordercard';
import { InteractiveDots } from '@/stories/background/interactivedots';
import { StarsBackground as DemoStarsBackground } from '@/stories/background/starsbackground';
import { SpotlightGrid } from '@/stories/background/spotlightgrid';
import { SlidingTabs } from '@/stories/navbar/slidingtabs';
import { componentCode } from '@/data/coderegistry';
import { FloatingDock } from '@/stories/navbar/floatingdock';
import { FluidNav } from '@/stories/navbar/fluidnav';
import { BentoGrid } from '@/stories/layout/bentogrid';
import { InfiniteScrollMarquee } from '@/stories/layout/infinitescrollmarquee';
import { CommandPalette } from '@/stories/modal/commandpalette';
import { GlowingSpotlightInput } from '@/stories/forms/glowingspotlightinput';
import { StickyScrollReveal } from '@/stories/scroll/stickyscrollreveal';
import { StackedToastNotifications } from '@/stories/feedback/stackedtoastnotifications';
import { WordByWordScrollReveal } from '@/stories/scroll/wordbywordscrollreveal';
import { AnimatedNumberCounter } from '@/stories/data/animatednumbercounter';
import { BeforeAfterComparisonSlider } from '@/stories/media/beforeaftercomparisonslider';
import { MagneticCustomCursor } from '@/stories/cursor/magneticcustomcursor';
const NAV_ITEMS = [
  { label: 'NAVIGATION', isGroup: true },
  { id: 'slidingtabs', label: 'Sliding Pill Tabs' },
  { id: 'floatingdock', label: 'Mac Floating Dock' },
  { id: 'fluidnav', label: 'Fluid Navigation' },
  { label: 'LAYOUT', isGroup: true },
  { id: 'bentogrid', label: 'The Bento Grid' },
  { id: 'marquee', label: 'Infinite Scroll Marquee' },
  { id: 'stickyscroll', label: 'Sticky Scroll Reveal' },
  { label: 'MODAL / FORMS', isGroup: true },
  { id: 'commandpalette', label: 'Command Palette' },
  { id: 'spotlightinput', label: 'Glowing Spotlight Input' },
  { label: 'TEXT EFFECTS', isGroup: true },
  { id: 'typewriter', label: 'Typewriter' },
  { id: 'filltext', label: 'Liquid Fill' },
  { id: 'scramble', label: 'Scramble' },
  { id: 'wordreveal', label: 'Word-by-Word Scroll Reveal' },
  { label: 'BUTTONS', isGroup: true },
  { id: 'dotexpand', label: 'Dot Expand' },
  { id: 'glowingborder', label: 'Glowing Border' },
  { id: 'magnetic', label: 'Magnetic' },
  { label: 'FEEDBACK / MEDIA', isGroup: true },
  { id: 'stackedtoast', label: 'Stacked Toast Notifications' },
  { id: 'numbercounter', label: 'Animated Number Counter' },
  { id: 'beforeafter', label: 'Before/After Slider' },
  { id: 'magneticcursor', label: 'Magnetic Custom Cursor' },
  { label: 'CARDS', isGroup: true },
  { id: 'gradientcard', label: 'Gradient Border Card' },
  { label: 'BACKGROUNDS', isGroup: true },
  { id: 'interactivedots', label: 'Interactive Dots' },
  { id: 'starsbg', label: 'Warp Speed Stars' },
  { id: 'spotlightgrid', label: 'Spotlight Grid' },

] as const;

export default function ComponentsPage() {
  const [activePage, setActivePage] = useState('slidingtabs');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    setActivePage(id);
    setMenuOpen(false);
  };

  const navContent = (
    <>
      <Link href="/" className="text-zinc-400 hover:text-white text-sm mb-8 block transition-colors">
        ← Back to Home
      </Link>
      <h1 className="text-lg font-black mb-6 px-3">Neel UI</h1>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) =>
          'isGroup' in item ? (
            <p key={item.label} className="text-xs text-zinc-500 font-bold px-3 mt-5 mb-1 tracking-widest uppercase">
              {item.label}
            </p>
          ) : (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer border-none ${
                activePage === item.id
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </button>
          )
        )}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-black text-white font-sans overflow-x-hidden">

      <aside className="scrollbar-thin hidden md:flex flex-col w-60 shrink-0 fixed top-0 left-0 h-screen border-r border-zinc-900 px-4 py-8 overflow-y-auto z-30">
        {navContent}
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-black border-b border-zinc-900">
        <span className="font-black text-base">Neel UI</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
          
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="scrollbar-thin w-72 bg-zinc-950 border-r border-zinc-900 px-4 py-8 overflow-y-auto mt-[49px]">
            {navContent}
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm mt-[49px]" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <main className="flex-1 md:ml-60 px-4 py-8 md:px-12 md:py-16 mt-[49px] md:mt-0 w-full overflow-x-hidden">
        {activePage === 'floatingdock' && (
          <Showcase
            title="Mac Floating Dock"
            description="A sticky navigation dock with physics-based magnification on hover."
            codeString={componentCode.floatingDockFull}
            props={[
              { name: 'items', type: 'DockItemProps[]', description: 'Array of objects containing { label, icon, href }.' },
            ]}
          >
            <div className="flex w-full h-64 md:h-80 items-end justify-center rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              <div className="relative z-10 w-full flex justify-center">
                <FloatingDock 
                  items={[
                    {
                      label: 'Home',
                      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    },
                    {
                      label: 'Profile',
                      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    },
                    {
                      label: 'Messages',
                      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    },
                    {
                      label: 'Settings',
                      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    }
                  ]} 
                />
              </div>
            </div>
          </Showcase>
        )}
        {activePage === 'fluidnav' && (
          <Showcase
            title="Fluid Mega Menu"
            description="A Stripe-inspired navigation menu that physically morphs its dimensions to fit the content of the active tab."
            codeString={componentCode.fluidNavFull}
            props={[
              { name: 'items', type: 'FluidNavItem[]', description: 'Array of objects containing { id, label, content }.' },
            ]}
          >
            <div className="w-full h-[420px] md:h-[500px] rounded-2xl bg-zinc-950/50 border border-zinc-800 p-4 md:p-8 overflow-hidden">
              <FluidNav 
                items={[
                  {
                    id: 'products',
                    label: 'Products',
                    content: (
                      <div className="w-full max-w-[min(86vw,400px)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-bold mb-2">Payments</h4>
                          <p className="text-zinc-400 text-sm">Accept credit cards and digital wallets securely.</p>
                        </div>
                        <div>
                          <h4 className="text-white font-bold mb-2">Billing</h4>
                          <p className="text-zinc-400 text-sm">Build recurring subscription models.</p>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: 'developers',
                    label: 'Developers',
                    content: (
                      <div className="w-full max-w-[250px] flex flex-col gap-3">
                        <a href="#" className="text-zinc-300 hover:text-white transition-colors">Documentation</a>
                        <a href="#" className="text-zinc-300 hover:text-white transition-colors">API Reference</a>
                        <a href="#" className="text-zinc-300 hover:text-white transition-colors">Webhooks</a>
                      </div>
                    )
                  },
                  {
                    id: 'company',
                    label: 'Company',
                    content: (
                      <div className="w-full max-w-[300px]">
                        <h4 className="text-white font-bold mb-4">About Neel UI</h4>
                        <p className="text-zinc-400 text-sm mb-4">Reusable React components designed for modern interfaces.</p>
                        <button className="w-full bg-white text-black font-semibold py-2 rounded-lg">View Open Roles</button>
                      </div>
                    )
                  }
                ]} 
              />
            </div>
          </Showcase>
        )}
        {activePage === 'bentogrid' && (
          <Showcase
            title="The Bento Grid"
            description="An asymmetrical feature grid with mixed card spans."
            codeString={componentCode.bentoGrid}
            props={[
              { name: 'cards', type: 'BentoCard[]', description: 'Card list containing id, title, description, and optional className.' },
            ]}
          >
            <BentoGrid
              cards={[
                { id: '1', title: 'Fast', description: 'Built for speed and smooth interactions.', className: 'sm:col-span-2' },
                { id: '2', title: 'Accessible', description: 'Keyboard-first and readable defaults.' },
                { id: '3', title: 'Customizable', description: 'Composable with Tailwind classes.' },
                { id: '4', title: 'Production Ready', description: 'Copy and paste directly.', className: 'sm:col-span-2 lg:col-span-1 lg:row-span-2' },
                { id: '5', title: 'Type Safe', description: 'Typed props for a better DX.', className: 'sm:col-span-2' },
              ]}
            />
          </Showcase>
        )}

        {activePage === 'marquee' && (
          <Showcase
            title="Infinite Scroll Marquee"
            description="An endless logo/content strip that pauses on hover."
            codeString={componentCode.infiniteScrollMarquee}
            props={[
              { name: 'items', type: 'string[]', description: 'List of labels to render in the marquee.' },
              { name: 'speedSeconds', type: 'number', description: 'Duration for one full loop.' },
            ]}
          >
            <InfiniteScrollMarquee items={['React', 'Next.js', 'TypeScript', 'Tailwind', 'Storybook', 'Motion']} speedSeconds={18} />
          </Showcase>
        )}

        {activePage === 'commandpalette' && (
          <Showcase
            title="Command Palette (Cmd/Ctrl + K)"
            description="Keyboard-first search modal for quick navigation."
            codeString={componentCode.commandPalette}
            props={[
              { name: 'items', type: 'CommandItem[]', description: 'Command rows with title/subtitle and optional callback.' },
              { name: 'placeholder', type: 'string', description: 'Input placeholder text.' },
            ]}
          >
            <CommandPalette
              items={[
                { id: 'components', title: 'Open Components', subtitle: 'Browse all UI patterns' },
                { id: 'docs', title: 'Open Docs', subtitle: 'Read setup and API usage' },
                { id: 'github', title: 'Open GitHub', subtitle: 'View repository source' },
              ]}
            />
          </Showcase>
        )}

        {activePage === 'spotlightinput' && (
          <Showcase
            title="Glowing Spotlight Input"
            description="Input with a cursor-following neon glow."
            codeString={componentCode.glowingSpotlightInput}
            props={[
              { name: 'placeholder', type: 'string', description: 'Input placeholder text.' },
            ]}
          >
            <GlowingSpotlightInput placeholder="Search components, docs, commands..." />
          </Showcase>
        )}

        {activePage === 'stickyscroll' && (
          <Showcase
            title="Sticky Scroll Reveal"
            description="Sticky left panel with synchronized scrolling content on the right."
            codeString={componentCode.stickyScrollReveal}
            props={[
              { name: 'sections', type: 'StickySection[]', description: 'Array of section objects containing title and description.' },
            ]}
          >
            <StickyScrollReveal
              sections={[
                { title: 'Plan', description: 'Define the component API and composition boundaries.' },
                { title: 'Build', description: 'Implement reusable blocks with responsive defaults.' },
                { title: 'Ship', description: 'Validate in real pages and publish confidently.' },
              ]}
            />
          </Showcase>
        )}

        {activePage === 'stackedtoast' && (
          <Showcase
            title="Stacked Toast Notifications"
            description="Stacked feedback toasts with depth and quick dismissal."
            codeString={componentCode.stackedToastNotifications}
            props={[]}
          >
            <StackedToastNotifications />
          </Showcase>
        )}

        {activePage === 'wordreveal' && (
          <Showcase
            title="Word-by-Word Scroll Reveal"
            description="Text appears progressively as scroll position advances."
            codeString={componentCode.wordByWordScrollReveal}
            props={[
              { name: 'text', type: 'string', description: 'The sentence that reveals word by word.' },
            ]}
          >
            <WordByWordScrollReveal text="Every scroll step reveals intent, context, and clarity for your users." />
          </Showcase>
        )}

        {activePage === 'numbercounter' && (
          <Showcase
            title="Animated Number Counter"
            description="Counts from 0 to target when entering the viewport."
            codeString={componentCode.animatedNumberCounter}
            props={[
              { name: 'target', type: 'number', description: 'Final value to animate to.' },
              { name: 'label', type: 'string', description: 'Optional helper text below the number.' },
              { name: 'durationMs', type: 'number', description: 'Animation duration in milliseconds.' },
              { name: 'suffix', type: 'string', description: 'Optional trailing unit like % or +.' },
            ]}
          >
            <AnimatedNumberCounter target={12500} suffix="+" label="Developers onboarded" durationMs={1500} />
          </Showcase>
        )}

        {activePage === 'beforeafter' && (
          <Showcase
            title="Image Before/After Comparison Slider"
            description="Drag slider to compare two visual states."
            codeString={componentCode.beforeAfterComparisonSlider}
            props={[
              { name: 'beforeSrc', type: 'string', description: 'Before image URL.' },
              { name: 'afterSrc', type: 'string', description: 'After image URL.' },
              { name: 'alt', type: 'string', description: 'Accessible alt text base label.' },
            ]}
          >
            <BeforeAfterComparisonSlider
              beforeSrc="/window.svg"
              afterSrc="/globe.svg"
              alt="Code setup"
            />
          </Showcase>
        )}

        {activePage === 'magneticcursor' && (
          <Showcase
            title="Magnetic Custom Cursor"
            description="Custom cursor layer for premium micro-interactions."
            codeString={componentCode.magneticCustomCursor}
            props={[
              { name: 'children', type: 'React.ReactNode', description: 'Interactive content wrapped by the cursor layer.' },
            ]}
          >
            <MagneticCustomCursor>
              <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-8 text-center">
                <p className="text-zinc-300 mb-4">Move your mouse in this panel.</p>
                <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">Hover Target</button>
              </div>
            </MagneticCustomCursor>
          </Showcase>
        )}

        {activePage === 'slidingtabs' && (
          <Showcase
            title="Sliding Pill Tabs"
            description="A sleek navigation menu where the background smoothly glides and resizes behind the active tab."
            codeString={componentCode.slidingTabsFull}
            props={[
              { name: 'tabs', type: 'Tab[]', default: '—', description: 'Array of objects containing { id, label }.' },
              { name: 'defaultActive', type: 'string', default: 'tabs[0]?.id', description: 'The ID of the tab that should be active on initial load.' },
            ]}
          >
            <div className="flex w-full h-64 items-center justify-center border border-zinc-800 rounded-2xl bg-zinc-950/50">
              <SlidingTabs 
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'integrations', label: 'Integrations' },
                  { id: 'billing', label: 'Billing & Plans' },
                  { id: 'settings', label: 'Settings' },
                ]} 
              />
            </div>
          </Showcase>
        )}

        
        {activePage === 'typewriter' && (
          <Showcase
            title="Typewriter Text"
            description="A multi-word looping typewriter with a blinking cursor."
            codeString={componentCode.typewriter}
            props={[
              { name: 'staticText', type: 'string', default: '—', description: 'Text prefix displayed before the animated words.' },
              { name: 'words', type: 'string[]', default: '—', description: 'List of words to loop through.' },
              { name: 'typingSpeed', type: 'number', default: '80', description: 'Milliseconds per character when typing.' },
              { name: 'deletingSpeed', type: 'number', default: '40', description: 'Milliseconds per character when deleting.' },
              { name: 'pauseDuration', type: 'number', default: '2000', description: 'Pause in ms before deleting a completed word.' },
              { name: 'textColor', type: 'string', default: '#ffffff', description: 'CSS color for the text and cursor.' },
              { name: 'fontSize', type: 'string', default: 'clamp(1.5rem, 4vw, 3rem)', description: 'Font size value applied to the container.' },
              { name: 'fontFamily', type: 'string', default: '"Space Grotesk", "Fira Code", monospace', description: 'Custom font stack for the text.' },
              { name: 'showCursor', type: 'boolean', default: 'true', description: 'Toggle the blinking cursor.' },
            ]}
          >
            <TypewriterText staticText="We specialize in" words={['Design.', 'Marketing.', 'Growth.']} textColor="#fff" />
          </Showcase>
        )}

        {activePage === 'scramble' && (
          <Showcase
            title="Scramble Text"
            description="Text that continuously scrambles its characters for a dynamic effect."
            codeString={componentCode.scramble}
            props={[
              { name: 'text', type: 'string', default: '—', description: 'Final text to resolve to after scrambling.' },
              { name: 'speed', type: 'number', default: '30', description: 'Interval delay in ms for scramble updates.' },
              { name: 'color', type: 'string', default: '#ffffff', description: 'Text and glow color.' },
              { name: 'size', type: 'string', default: '1rem', description: 'Font size value.' },
              { name: 'fontFamily', type: 'string', default: '"Space Grotesk", "Fira Code", monospace', description: 'Font stack used for the text.' },
              { name: 'glow', type: 'boolean', default: 'true', description: 'Enable outer glow effect.' },
            ]}
          >
            <ScrambleText text="SCRAMBLE Text" color="#f87171" />
          </Showcase>
        )}

        {activePage === 'filltext' && (
          <Showcase
            title="Liquid Fill"
            description="Uses an SVG wave to create a liquid rising effect."
            codeString={componentCode.filltext}
            props={[
              { name: 'text', type: 'string', default: '—', description: 'Text to render with the fill effect.' },
              { name: 'baseColor', type: 'string', default: '#ffb3c6', description: 'Base text color before fill.' },
              { name: 'fillColor', type: 'string', default: '#ff0054', description: 'Color of the animated liquid fill.' },
              { name: 'size', type: 'string', default: 'clamp(2.5rem, 8vw, 6rem)', description: 'Font size value for the text.' },
              { name: 'fontFamily', type: 'string', default: '"Arial Black", "Impact", sans-serif', description: 'Font stack for the text.' },
              { name: 'duration', type: 'number', default: '3000', description: 'Animation duration in ms for the fill.' },
            ]}
          >
            <FillText text="SYSTEM" baseColor="#bae6fd" fillColor="#0284c7" size="5rem" />
          </Showcase>
        )}

        
        {activePage === 'dotexpand' && (
          <Showcase
            title="Dot Expand Button"
            description="A button with a dot that expands into an arrow on hover."
            codeString={componentCode.dotExpand}
            props={[
              { name: 'text', type: 'string', default: '—', description: 'Label to display inside the button.' },
            ]}
          >
            <DotExpandButton text="Learn More" />
          </Showcase>
        )}

        {activePage === 'glowingborder' && (
          <Showcase
            title="Glowing Border Button"
            description="A button with a continuously spinning glowing border."
            codeString={componentCode.glowingBorder}
            props={[
              { name: 'text', type: 'string', default: '—', description: 'Button label.' },
              { name: 'onClick', type: '() => void', default: '—', description: 'Optional click handler.' },
              { name: 'gradientColors', type: 'string', default: '#E2CBFF, #393BB2, #E2CBFF', description: 'Comma-separated colors for the spinning conic gradient.' },
              { name: 'innerBgColor', type: 'string', default: 'bg-zinc-950', description: 'Tailwind class for the inner background.' },
              { name: 'textColor', type: 'string', default: 'text-white', description: 'Tailwind class for text color.' },
              { name: 'borderWidth', type: 'string', default: '2px', description: 'Padding applied to create the border thickness.' },
              { name: 'spinDuration', type: 'string', default: '2s', description: 'CSS duration for the gradient spin.' },
              { name: 'padding', type: 'string', default: 'px-5 py-2 md:px-8', description: 'Tailwind padding classes for the inner button.' },
              { name: 'rounded', type: 'string', default: 'rounded-full', description: 'Tailwind rounding classes applied to both layers.' },
            ]}
          >
            <GlowingBorderButton text="Click Me" gradientColors="#E2CBFF, #393BB2, #E2CBFF" innerBgColor="bg-zinc-950" textColor="text-white" borderWidth="2px" spinDuration="2s" padding="px-8 py-2" rounded="rounded-full" />
          </Showcase>
        )}

        {activePage === 'magnetic' && (
          <Showcase
            title="Magnetic Button"
            description="A button that attracts the cursor with a magnetic pull effect."
            codeString={componentCode.magnetic}
            props={[
              { name: 'text', type: 'string', default: '—', description: 'Button label.' },
            ]}
          >
            <MagneticButton text="Hover Me" />
          </Showcase>
        )}

        
        {activePage === 'gradientcard' && (
          <Showcase
            title="Gradient Border Card"
            description="A card with a spinning gradient outline."
            codeString={componentCode.gradientCard}
            props={[
              { name: 'children', type: 'React.ReactNode', default: '—', description: 'Content to render inside the card.' },
              { name: 'className', type: 'string', default: 'p-6 md:p-8', description: 'Classes applied to the inner card container.' },
              { name: 'gradientColors', type: 'string', default: '#00ffcc, #ff0054, #00ffcc', description: 'Comma-separated colors for the spinning border.' },
              { name: 'animationSpeed', type: 'string', default: '3s', description: 'CSS duration for the border spin animation.' },
            ]}
          >
            <GradientBorderCard className="w-72 md:w-80 h-96 p-8 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold mb-2 text-white">Pro Plan</h3>
              <p className="text-zinc-400">$29/month</p>
            </GradientBorderCard>
          </Showcase>
        )}

        
        {activePage === 'interactivedots' && (
          <Showcase
            title="Interactive Dot Background"
            description="A canvas-based particle network that physically reacts to the mouse."
            codeString={componentCode.interactiveDotsFull}
            props={[
              { name: 'dotColor', type: 'string', default: '#00ffcc', description: 'Fill color for the dots.' },
              { name: 'lineColor', type: 'string', default: '#00ffcc', description: 'Stroke color for connecting lines.' },
              { name: 'bgColor', type: 'string', default: '#000000', description: 'Canvas background color.' },
              { name: 'density', type: 'number', default: '180', description: 'Relative particle density (higher = more dots).' },
              { name: 'speed', type: 'number', default: '1', description: 'Particle velocity multiplier.' },
              { name: 'mouseInteractionRadius', type: 'number', default: '130', description: 'Radius in px for mouse repulsion.' },
              { name: 'connectionRadius', type: 'number', default: '110', description: 'Max distance in px to draw connecting lines.' },
            ]}
          >
            <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
              <InteractiveDots dotColor="#ff0054" lineColor="#ff0054" bgColor="#000000" />
              <div className="z-10 text-center pointer-events-none">
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-widest uppercase mb-2">Hover Over Me</h3>
                <p className="text-zinc-400 text-sm md:text-base">Watch the particles scatter.</p>
              </div>
            </div>
          </Showcase>
        )}

        {activePage === 'starsbg' && (
          <Showcase
            title="Warp Speed Stars"
            description="A 3D starfield canvas that creates a hyperspace flying effect."
            codeString={componentCode.starsBackgroundFull}
            props={[]}
          >
            <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden border border-zinc-800 flex flex-col items-center justify-center">
              <DemoStarsBackground />
              <div className="z-10 text-center pointer-events-none">
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase mb-2 drop-shadow-lg">Hyperspace</h3>
                <p className="text-zinc-300 text-sm md:text-base drop-shadow-md">Light speed engaged.</p>
              </div>
            </div>
          </Showcase>
        )}

        {activePage === 'spotlightgrid' && (
          <Showcase 
            title="Spotlight Grid" 
            description="A hidden grid that is revealed by a mouse-tracking flashlight effect." 
            codeString={componentCode.spotlightGridFull}
            props={[
              { name: 'gridColor', type: 'string', default: 'rgba(255, 255, 255, 0.15)', description: 'Grid line color.' },
              { name: 'bgColor', type: 'string', default: '#000000', description: 'Background color behind the grid.' },
              { name: 'spotlightSize', type: 'number', default: '320', description: 'Radius in px of the revealed spotlight.' },
              { name: 'gridSize', type: 'number', default: '32', description: 'Pixel size of grid cells.' },
            ]}
          >
            <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden border border-zinc-800 flex flex-col items-center justify-center">
              <SpotlightGrid gridColor="rgba(0, 255, 204, 0.2)" bgColor="#09090b" spotlightSize={350} />
              <div className="z-10 text-center pointer-events-none">
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">Hover to Reveal</h3>
                <p className="text-zinc-400 text-sm md:text-base">Pure CSS. Zero canvas rendering.</p>
              </div>
            </div>
          </Showcase>
        )}

      </main>
    </div>
  );
}