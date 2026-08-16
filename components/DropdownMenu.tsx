'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface DropdownOption {
  value: string
  label: string
}

interface Props {
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  icon?: ReactNode
  label?: string
  className?: string
  menuLabel?: string
}

export default function DropdownMenu({
  value,
  options,
  onChange,
  icon,
  label,
  className = '',
  menuLabel = 'Choose an option',
}: Props) {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) closeMenu()
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  })

  function closeMenu() {
    if (!open) return
    setClosing(true)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 180)
  }

  function toggleMenu() {
    if (open) {
      closeMenu()
      return
    }
    setClosing(false)
    setOpen(true)
  }

  return (
    <div ref={ref} className={'xp-theme-select relative ' + className}>
      <button
        type="button"
        className="xp-theme-trigger flex items-center gap-1.5"
        onClick={toggleMenu}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {icon}
        {label && <span>{label}</span>}
        <span>{selected?.label}</span>
        <span className="xp-theme-chevron" aria-hidden="true">▾</span>
      </button>

      {(open || closing) && (
        <div
          className={'xp-theme-menu' + (closing ? ' is-closing' : '')}
          role="listbox"
          aria-label={menuLabel}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={option.value === value ? 'xp-theme-option is-selected' : 'xp-theme-option'}
              onClick={() => {
                onChange(option.value)
                closeMenu()
              }}
            >
              <span className="xp-theme-option-mark">{option.value === value ? '✓' : ''}</span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
