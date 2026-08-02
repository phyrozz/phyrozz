/**
 * Inline SVG decorations.
 * All are pure SVG so no image files are required.
 */
import type { CSSProperties } from 'react'

interface DecoProps {
  className?: string
  style?: CSSProperties
}

/** A small star decoration */
export function StarDeco({ className = '', style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2 L13.8 8.6 L20.6 8.6 L15 12.6 L16.8 19.2 L12 15.2 L7.2 19.2 L9 12.6 L3.4 8.6 L10.2 8.6 Z"
        fill="#f9c84a"
        stroke="#e8a820"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Heart decoration */
export function HeartDeco({ className = '', style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21 C12 21 3 14 3 8 A4.5 4.5 0 0 1 12 6.3 A4.5 4.5 0 0 1 21 8 C21 14 12 21 12 21Z"
        fill="#f9d0d0"
        stroke="#f0b8b8"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/** Clover / flower decoration */
export function FlowerDeco({ className = '', style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="10" r="5" fill="#c8e8d0" stroke="#a8d4b4" strokeWidth="1.5" />
      <circle cx="22" cy="18" r="5" fill="#c8e8d0" stroke="#a8d4b4" strokeWidth="1.5" />
      <circle cx="10" cy="18" r="5" fill="#c8e8d0" stroke="#a8d4b4" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" fill="#f9c84a" stroke="#e8a820" strokeWidth="1.5" />
    </svg>
  )
}

/** Paw print decoration */
export function PawDeco({ className = '', style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* toes */}
      <circle cx="10" cy="12" r="4" fill="#f9d0d0" stroke="#f0b8b8" strokeWidth="1.5" />
      <circle cx="20" cy="8" r="4.5" fill="#f9d0d0" stroke="#f0b8b8" strokeWidth="1.5" />
      <circle cx="30" cy="12" r="4" fill="#f9d0d0" stroke="#f0b8b8" strokeWidth="1.5" />
      {/* palm */}
      <ellipse cx="20" cy="26" rx="10" ry="9" fill="#f9d0d0" stroke="#f0b8b8" strokeWidth="1.5" />
      {/* knuckle dots */}
      <circle cx="15" cy="25" r="2" fill="#f0b8b8" />
      <circle cx="20" cy="23" r="2" fill="#f0b8b8" />
      <circle cx="25" cy="25" r="2" fill="#f0b8b8" />
    </svg>
  )
}

/** Mushroom */
export function MushroomDeco({ className = '', style }: DecoProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* cap */}
      <ellipse cx="24" cy="24" rx="20" ry="16" fill="#f9d0d0" stroke="#f0b8b8" strokeWidth="2" />
      {/* stem */}
      <rect x="16" y="32" width="16" height="16" rx="6" fill="#fdf6ec" stroke="#b08060" strokeWidth="2" />
      {/* dots */}
      <circle cx="16" cy="18" r="4" fill="white" opacity="0.7" />
      <circle cx="28" cy="14" r="3" fill="white" opacity="0.7" />
      <circle cx="32" cy="23" r="2.5" fill="white" opacity="0.7" />
    </svg>
  )
}
