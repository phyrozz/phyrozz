'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from '@/components/XPIcon'
import CuteImage from '@/components/CuteImage'

interface Props {
  images: string[]
  title: string
  current: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onJump: (index: number) => void
}

export default function ImageLightbox({
  images,
  title,
  current,
  onClose,
  onPrev,
  onNext,
  onJump,
}: Props) {
  const [mounted, setMounted] = useState(false)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    setMounted(true)
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  const url = images[current]

  if (!mounted) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} - photo ${current + 1} of ${images.length}`}
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-3 py-10 sm:min-h-full sm:justify-center sm:py-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-0 top-0 text-cream transition-colors hover:text-honey sm:-top-10"
          aria-label="Close preview"
        >
          <X size={24} />
        </button>

        <div
          className="relative w-full overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl"
          style={{ aspectRatio: '3 / 4', maxHeight: '70svh' }}
        >
          <CuteImage
            src={url}
            alt={`${title} photo ${current + 1}`}
            fill
            wrapperClassName="w-full h-full"
            className="bg-black/50 object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-cream">{title}</p>
          <p className="mt-0.5 text-xs text-cream/50">
            {current + 1} / {images.length}
          </p>
        </div>

        {images.length > 1 && (
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              disabled={current === 0}
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous photo"
            >
              <ChevronLeft size={16} aria-hidden="true" /> Prev
            </button>
            <button
              onClick={onNext}
              disabled={current === images.length - 1}
              className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-cream transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next photo"
            >
              Next <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
            {images.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => onJump(i)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === current
                    ? 'scale-110 border-honey shadow-md'
                    : 'border-white/20 opacity-50 hover:border-white/60 hover:opacity-100'
                }`}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === current}
              >
                <CuteImage
                  src={imgUrl}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  wrapperClassName="w-full h-full"
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
