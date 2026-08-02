'use client'

import { useEffect, useState } from 'react'
import { Home, Briefcase, Monitor, Palette, Sparkles, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Section {
  id: string
  label: string
  Icon: LucideIcon
}

const SECTIONS: Section[] = [
  { id: 'hero',     label: 'Home',       Icon: Home },
  { id: 'work',     label: 'Experience', Icon: Briefcase },
  { id: 'projects', label: 'Projects',   Icon: Monitor },
  { id: 'cosplays', label: 'Cosplays',   Icon: Sparkles },
  { id: 'hobbies',  label: 'Hobbies',    Icon: Palette },
  // { id: 'tips',     label: 'Tips',       Icon: Lightbulb },
]

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [visible, setVisible]   = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Combine both scroll visibility and active section into one listener
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120)

      // Find whichever section's top edge is closest to 30% down the viewport.
      // This works regardless of how short a section is.
      const threshold = window.innerHeight * 0.3
      let bestId = SECTIONS[0].id
      let bestDist = Infinity

      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        // Only consider sections whose top has already passed the threshold
        if (top <= threshold + 10) {
          const dist = Math.abs(top - threshold)
          if (dist < bestDist) {
            bestDist = dist
            bestId = id
          }
        }
      }

      setActiveId(bestId)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount to set initial state
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className={`
        fixed right-5 top-1/2 -translate-y-1/2 z-40
        flex flex-col items-end gap-1.5
        transition-all duration-500
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Table of contents"
      role="navigation"
    >
      {SECTIONS.map(({ id, label, Icon }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            aria-current={isActive ? 'location' : undefined}
            className={`
              flex items-center gap-2 rounded-full border
              transition-all duration-200 group
              focus:outline-none focus-visible:ring-2 focus-visible:ring-honey
              ${isActive
                ? 'bg-honey border-honey-dark shadow-md px-3 py-1.5'
                : 'bg-white/80 border-cream-dark hover:border-brown-light shadow-sm px-2 py-1.5'}
            `}
          >
            <Icon
              size={14}
              aria-hidden="true"
              className={`shrink-0 transition-colors duration-200 ${
                isActive ? 'text-brown' : 'text-brown-light group-hover:text-brown'
              }`}
            />
            <span
              className={`
                text-xs font-bold whitespace-nowrap overflow-hidden
                transition-all duration-200
                ${expanded || isActive ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0'}
                ${isActive ? 'text-brown' : 'text-brown-light'}
              `}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
