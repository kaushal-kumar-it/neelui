'use client'

import { Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Support', href: '/formsfree' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-card/50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-accent/10 to-transparent rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground font-bold">
                N
              </div>
              Neel UI
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Modern React UI components for fast product development.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Neel UI. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  )
}
