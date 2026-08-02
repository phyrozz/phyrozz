'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean indicating whether the element has entered
 * the viewport. Once visible it stays visible (no re-hide on scroll up).
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // fire once
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

interface SectionRevealProps {
  children: React.ReactNode
  /**
   * Animation variant:
   *  - "fade-up"   : fade in while sliding up (default)
   *  - "fade-left" : fade in from the left
   *  - "fade-right": fade in from the right
   *  - "fade"      : pure fade, no translate
   */
  variant?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade'
  /** Delay in milliseconds before the transition starts */
  delay?: number
  className?: string
}

const HIDDEN: Record<SectionRevealProps['variant'] & string, string> = {
  'fade-up':    'opacity-0 translate-y-8',
  'fade-left':  'opacity-0 -translate-x-6',
  'fade-right': 'opacity-0 translate-x-6',
  'fade':       'opacity-0',
}

const VISIBLE = 'opacity-100 translate-y-0 translate-x-0'

export default function SectionReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}: SectionRevealProps) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? VISIBLE : HIDDEN[variant]
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
