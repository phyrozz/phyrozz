'use client'

import { useState } from 'react'
import { Home, Briefcase, Monitor, Palette, Sparkles, Menu, X, Music2 } from 'lucide-react'

const NAV_LINKS = [
  { href: '#hero',     label: 'Home',       Icon: Home },
  { href: '#work',     label: 'Experience', Icon: Briefcase },
  { href: '#projects', label: 'Projects',   Icon: Monitor },
  { href: '#music',    label: 'Music',      Icon: Music2 },
  { href: '#cosplays', label: 'Cosplays',   Icon: Sparkles },
  { href: '#hobbies',  label: 'Hobbies',    Icon: Palette },
]

export default function Navbar({ name }: { name?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b-2 border-dashed border-brown-light/40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Name / logo */}
        <a href="#hero" className="flex items-center gap-2 font-bold text-brown hover:opacity-80 transition-opacity">
          <Sparkles size={20} className="text-honey shrink-0" aria-hidden="true" />
          <span
            className="hidden sm:inline truncate max-w-[160px]"
            style={{ fontFamily: 'var(--font-pacifico), cursive', fontSize: '1.1rem' }}
          >
            {'Reimu Dev'}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-1">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-brown font-semibold text-sm hover:bg-blush transition-colors"
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-blush transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-cream-dark px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-brown font-semibold hover:bg-blush transition-colors"
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
