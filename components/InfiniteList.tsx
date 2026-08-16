'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  onLoadMore: () => void
  hasMore: boolean
  loading: boolean
}

export default function InfiniteList({ children, onLoadMore, hasMore, loading }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading) onLoadMore()
      },
      { rootMargin: '160px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return (
    <>
      {children}
      <div ref={sentinelRef} className="flex min-h-8 items-center justify-center py-2" aria-live="polite">
        {loading && <span className="text-xs font-bold text-brown-light">Loading more…</span>}
        {!hasMore && <span className="text-[0.65rem] text-brown-light/60">End of list</span>}
      </div>
    </>
  )
}
