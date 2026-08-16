'use client'

import { useCallback, useEffect, useState } from 'react'
import { Important, Music2 } from '@/components/XPIcon'
import type { LastFmTrack } from '@/lib/lastfm'

const DIARY_CACHE_KEY = 'audio-diary-entry'

export default function AudioDiary({ tracks, refreshKey = 0 }: { tracks: LastFmTrack[]; refreshKey?: number }) {
  const [entry, setEntry] = useState<string | null>(null)
  const [visibleEntry, setVisibleEntry] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const writeEntry = useCallback(async () => {
    setLoading(true)
    setError(null)
    setEntry(null)
    setVisibleEntry('')
    try {
      const response = await fetch('/api/music/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracks: tracks.slice(0, 20) }),
      })
      const data = await response.json() as { entry?: string; error?: string }
      if (!response.ok) throw new Error(data.error || 'The diary entry could not be written.')
      const nextEntry = data.entry ?? null
      setEntry(nextEntry)
      if (nextEntry) window.localStorage.setItem(DIARY_CACHE_KEY, nextEntry)
    } catch (cause) {
      const cachedEntry = window.localStorage.getItem(DIARY_CACHE_KEY)
      if (cachedEntry) {
        setEntry(cachedEntry)
        setError(null)
      } else {
        setError(cause instanceof Error ? cause.message : 'The diary entry could not be written.')
      }
    } finally {
      setLoading(false)
    }
  }, [tracks])

  useEffect(() => {
    void writeEntry()
  }, [writeEntry, refreshKey])

  useEffect(() => {
    if (!entry) return
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setVisibleEntry(entry.slice(0, index))
      if (index >= entry.length) window.clearInterval(timer)
    }, 16)
    return () => window.clearInterval(timer)
  }, [entry])

  return (
    <div className="mt-3 rounded-3xl border border-blush-dark/25 bg-gradient-to-br from-blush/20 to-white/80 p-3 sm:p-4">
      {loading && <p className="text-sm leading-relaxed text-ink/60">Writing a reflection on the latest tracks<span className="animate-pulse">…</span></p>}
      {visibleEntry && <p className="text-sm leading-relaxed text-ink/80">{visibleEntry}<span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-brown-light align-[-2px]" aria-hidden="true" /></p>}
      {!entry && !loading && !error && <p className="mt-2 text-sm leading-relaxed text-ink/60">A little reflection on what has been playing lately.</p>}
      {error && <p className="mt-2 flex items-start gap-1.5 text-sm leading-relaxed text-brown-light"><Important size={12} className="mt-1 shrink-0" aria-hidden="true" />{error}</p>}
    </div>
  )
}
