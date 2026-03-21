import Link from 'next/link';

type DependencyItem = {
  name: string;
  version: string;
  purpose: string;
};

const coreDependencies: DependencyItem[] = [
  { name: 'next', version: '16.1.6', purpose: 'App framework, routing, server rendering, and bundling.' },
  { name: 'react', version: '19.2.3', purpose: 'Component model and UI rendering.' },
  { name: 'react-dom', version: '19.2.3', purpose: 'DOM renderer for React components.' },
  { name: 'framer-motion', version: '^12.34.3', purpose: 'Animation and interaction primitives used in UI components.' },
  { name: 'lucide-react', version: '^0.564.0', purpose: 'Icon library for navigation and interface controls.' },
  { name: 'react-syntax-highlighter', version: '^16.1.0', purpose: 'Syntax highlighted code blocks in component showcases.' },
  { name: 'react-tsparticles', version: '^2.12.2', purpose: 'React wrapper for particle-based animated backgrounds.' },
  { name: 'tsparticles', version: '^3.9.1', purpose: 'Particles engine powering interactive background effects.' },
];

const devDependencies: DependencyItem[] = [
  { name: 'typescript', version: '^5', purpose: 'Static typing and editor tooling.' },
  { name: 'tailwindcss', version: '^4', purpose: 'Utility-first styling system.' },
  { name: '@tailwindcss/postcss', version: '^4', purpose: 'PostCSS integration for Tailwind CSS.' },
  { name: 'eslint', version: '^9', purpose: 'Code linting and quality checks.' },
  { name: 'eslint-config-next', version: '16.1.6', purpose: 'Next.js linting rules and defaults.' },
  { name: 'storybook', version: '^10.2.12', purpose: 'Component-driven development and isolated previews.' },
  { name: '@storybook/nextjs-vite', version: '^10.2.12', purpose: 'Next.js + Vite Storybook framework integration.' },
  { name: '@storybook/addon-docs', version: '^10.2.12', purpose: 'Storybook docs generation and documentation UI.' },
  { name: '@storybook/addon-a11y', version: '^10.2.12', purpose: 'Accessibility checks in Storybook.' },
  { name: '@storybook/addon-onboarding', version: '^10.2.12', purpose: 'Storybook onboarding and guidance.' },
  { name: '@storybook/addon-vitest', version: '^10.2.12', purpose: 'Vitest integration for Storybook test workflows.' },
  { name: '@chromatic-com/storybook', version: '^5.0.1', purpose: 'Visual testing and hosted Storybook publishing.' },
  { name: 'vitest', version: '^4.0.18', purpose: 'Unit and component test runner.' },
  { name: '@vitest/coverage-v8', version: '^4.0.18', purpose: 'V8 coverage reporting for Vitest.' },
  { name: '@vitest/browser-playwright', version: '^4.0.18', purpose: 'Browser-mode test execution integration.' },
  { name: 'playwright', version: '^1.58.2', purpose: 'Browser automation and end-to-end test foundation.' },
  { name: 'vite', version: '^7.3.1', purpose: 'Fast dev server/build pipeline for Storybook and tooling.' },
  { name: '@types/node', version: '^20', purpose: 'Type definitions for Node.js APIs.' },
  { name: '@types/react', version: '^19', purpose: 'Type definitions for React.' },
  { name: '@types/react-dom', version: '^19', purpose: 'Type definitions for React DOM.' },
  { name: '@types/react-syntax-highlighter', version: '^15.5.13', purpose: 'Type definitions for syntax highlighter package.' },
];

const featureSections = [
  {
    title: 'Navigation',
    items: ['Sliding Pill Tabs', 'Mac Floating Dock', 'Fluid Navigation'],
  },
  {
    title: 'Text Effects',
    items: ['Typewriter Text', 'Liquid Fill', 'Scramble Text'],
  },
  {
    title: 'Buttons & Cards',
    items: ['Dot Expand Button', 'Glowing Border Button', 'Magnetic Button', 'Gradient Border Card'],
  },
  {
    title: 'Background Effects',
    items: ['Interactive Dots', 'Warp Speed Stars', 'Spotlight Grid'],
  },
];

const scripts = [
  { command: 'npm run dev', description: 'Start local development server.' },
  { command: 'npm run build', description: 'Create a production build.' },
  { command: 'npm run start', description: 'Run production server after build.' },
  { command: 'npm run lint', description: 'Run lint checks.' },
  { command: 'npm run storybook', description: 'Start Storybook on port 6006.' },
  { command: 'npm run build-storybook', description: 'Generate static Storybook build.' },
];

const installSteps = [
  'Clone the repository and install dependencies.',
  'Run the dev server and open the app in browser.',
  'Browse components from `/components` and copy snippets from the code tab.',
  'Use Storybook for isolated component development.',
];

function DependencyTable({ title, rows }: { title: string; rows: DependencyItem[] }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 overflow-hidden">
      <div className="border-b border-zinc-800 px-4 py-3 md:px-5">
        <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900/70">
            <tr>
              <th className="px-4 py-3 text-left text-zinc-400 font-semibold">Package</th>
              <th className="px-4 py-3 text-left text-zinc-400 font-semibold">Version</th>
              <th className="px-4 py-3 text-left text-zinc-400 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.name} className="border-t border-zinc-800/80 align-top">
                <td className="px-4 py-3 text-fuchsia-300 font-mono whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-3 text-cyan-300 font-mono whitespace-nowrap">{item.version}</td>
                <td className="px-4 py-3 text-zinc-300 min-w-[18rem]">{item.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 md:px-8 md:pt-28">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <Link href="/components" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Explore Components →
          </Link>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 p-5 md:p-8 mb-8">
          <p className="mb-3 inline-flex rounded-full border border-zinc-700 px-3 py-1 text-xs tracking-widest uppercase text-zinc-400">
            Documentation
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Neel UI Docs</h1>
          <p className="max-w-3xl text-zinc-300 text-sm md:text-base leading-relaxed">
            Neel UI is a premium component collection for modern Next.js apps. This documentation covers setup,
            architecture, available scripts, core dependencies, and how to use every component category in production.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <section className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 md:p-6">
            <h2 className="text-xl font-bold mb-4">Quick Start</h2>
            <ol className="space-y-3 text-zinc-300 text-sm md:text-base list-decimal list-inside">
              {installSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 overflow-x-auto">
              <pre className="text-xs md:text-sm text-zinc-200">
{`git clone <your-repo-url>
cd neel
npm install
npm run dev`}
              </pre>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 md:p-6">
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
            <ul className="space-y-2 text-sm md:text-base text-zinc-300">
              <li><span className="text-white font-medium">Framework:</span> Next.js (App Router)</li>
              <li><span className="text-white font-medium">UI:</span> React + Tailwind CSS</li>
              <li><span className="text-white font-medium">Motion:</span> Framer Motion</li>
              <li><span className="text-white font-medium">Showcase:</span> Storybook</li>
              <li><span className="text-white font-medium">Typing:</span> TypeScript</li>
            </ul>
          </section>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 md:p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Component Library Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {featureSections.map((section) => (
              <div key={section.title} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-200 mb-3">{section.title}</h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {section.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 md:p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">NPM Scripts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-900/70">
                <tr>
                  <th className="px-4 py-3 text-left text-zinc-400 font-semibold">Command</th>
                  <th className="px-4 py-3 text-left text-zinc-400 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {scripts.map((script) => (
                  <tr key={script.command} className="border-t border-zinc-800/80">
                    <td className="px-4 py-3 font-mono text-cyan-300 whitespace-nowrap">{script.command}</td>
                    <td className="px-4 py-3 text-zinc-300">{script.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <DependencyTable title="Runtime Dependencies" rows={coreDependencies} />
          <DependencyTable title="Development Dependencies" rows={devDependencies} />
        </div>
      </div>
    </main>
  );
}
