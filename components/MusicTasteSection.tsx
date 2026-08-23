'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Disc3, Flame, Headphones, Music2, Play, Radio, Important, Refresh } from '@/components/XPIcon'
import CuteImage from '@/components/CuteImage'
import type { LastFmAlbum, LastFmArtist, LastFmTag, LastFmTaste, LastFmTrack, LastFmPeriod } from '@/lib/lastfm'
import DropdownMenu from '@/components/DropdownMenu'
import InfiniteList from '@/components/InfiniteList'
import AudioDiary from '@/components/AudioDiary'

interface Props {
  music: LastFmTaste | null
}

const PERIOD_OPTIONS = [
  { value: '7day', label: '1 week' },
  { value: '1month', label: '1 month' },
  { value: 'overall', label: 'All time' },
] as const

type PanelKey = 'artists' | 'recent' | 'albums' | 'tracks'
type PanelPeriods = Record<PanelKey, LastFmPeriod>
const DEFAULT_PERIODS: PanelPeriods = {
  artists: 'overall',
  recent: 'overall',
  albums: 'overall',
  tracks: 'overall',
}
const numberFormat = new Intl.NumberFormat('en-US')

function formatCount(count: number) {
  return numberFormat.format(count)
}

function formatDate(isoDate: string | null) {
  if (!isoDate) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

function MusicEmptyState() {
  return (
    <div className="pastel-card bg-white/80 p-5 text-center shadow-sm sm:p-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-dark sm:h-14 sm:w-14">
        <Music2 size={24} className="text-brown-light sm:size-[28px]" aria-hidden="true" />
      </div>
      <h3 className="text-base font-extrabold text-ink sm:text-lg">Music section is waiting for Last.fm</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink/70">
        Add <code>LASTFM_API_KEY</code> and <code>LASTFM_USERNAME=Phyrozz</code> to your
        environment, and this section will start showing your listening taste.
      </p>
    </div>
  )
}

function PanelShell({
  title,
  icon: Icon,
  period,
  onPeriodChange,
  children,
}: {
  title: string
  icon: typeof Disc3
  period?: LastFmPeriod
  onPeriodChange?: (period: string) => void
  children: ReactNode
}) {
  return (
    <section className="pastel-card flex h-[28rem] min-h-[28rem] max-h-[28rem] flex-col bg-white/85 p-4 shadow-sm sm:min-h-[18rem]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon size={16} className="text-honey-dark" aria-hidden="true" />
          <h3 className="truncate text-sm font-extrabold uppercase tracking-[0.2em] text-brown">{title}</h3>
        </div>
        {period && onPeriodChange && (
          <DropdownMenu value={period} options={[...PERIOD_OPTIONS]} onChange={onPeriodChange} className="music-period-menu" menuLabel={title + ' period'} />
        )}
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        {children}
      </div>
    </section>
  )
}

function ArtistRow({ artist }: { artist: LastFmArtist }) {
  return (
    <a
      href={artist.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-cream-dark bg-cream/70 p-2.5 transition-colors hover:border-honey hover:bg-white"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-cream-dark bg-cream">
        {artist.imageUrl ? (
          <CuteImage
            src={artist.imageUrl}
            alt={artist.name}
            fill
            wrapperClassName="h-full w-full"
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-dark">
            <Disc3 size={18} className="text-brown-light" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink group-hover:text-brown">{artist.name}</p>
        <p className="text-xs text-ink/55">{formatCount(artist.playcount)} plays</p>
      </div>
    </a>
  )
}

function TrackRow({ track, compact = false }: { track: LastFmTrack; compact?: boolean }) {
  const badge = track.nowPlaying ? 'Now playing' : track.playcount ? `${formatCount(track.playcount)} plays` : null

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-cream-dark bg-cream/70 p-2.5 transition-colors hover:border-sky-dark hover:bg-white"
    >
      <div className={`relative shrink-0 overflow-hidden rounded-xl border border-cream-dark bg-cream ${compact ? 'h-10 w-10' : 'h-11 w-11'}`}>
        {track.imageUrl ? (
          <CuteImage
            src={track.imageUrl}
            alt={track.name}
            fill
            wrapperClassName="h-full w-full"
            className="object-cover"
            sizes={compact ? '40px' : '44px'}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-dark">
            <Play size={16} className="text-brown-light" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink group-hover:text-brown">{track.name}</p>
        <p className="truncate text-xs text-ink/55">
          {track.artist}{track.album ? ` - ${track.album}` : ''}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brown-light">
          {track.nowPlaying ? (
            <>
              <Radio size={10} aria-hidden="true" />
              Now playing
            </>
          ) : (
            <>
              <Important size={10} aria-hidden="true" />
              {formatDate(track.playedAt)}
            </>
          )}
        </div>
      </div>
      {badge && (
        <span className="shrink-0 rounded-full bg-honey/20 px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-brown">
          {badge}
        </span>
      )}
    </a>
  )
}

function AlbumRow({ album }: { album: LastFmAlbum }) {
  return (
    <a
      href={album.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl border border-cream-dark bg-cream/70 p-2.5 transition-colors hover:border-blush-dark hover:bg-white"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-cream-dark bg-cream">
        {album.imageUrl ? (
          <CuteImage
            src={album.imageUrl}
            alt={album.name}
            fill
            wrapperClassName="h-full w-full"
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream-dark">
            <Headphones size={16} className="text-brown-light" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink group-hover:text-brown">{album.name}</p>
        <p className="truncate text-xs text-ink/55">{album.artist}</p>
      </div>
      <span className="shrink-0 rounded-full bg-blush/30 px-2 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-brown">
        {formatCount(album.playcount)}
      </span>
    </a>
  )
}

function TagChip({ tag }: { tag: LastFmTag }) {
  return (
    <a
      href={tag.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pastel-badge bg-white/90 hover:bg-white"
    >
      #{tag.name}
    </a>
  )
}

export default function MusicTasteSection({ music }: Props) {
  const [periods, setPeriods] = useState<PanelPeriods>(DEFAULT_PERIODS)
  const [datasets, setDatasets] = useState<Partial<Record<LastFmPeriod, LastFmTaste>>>(
    music ? { overall: music } : {},
  )
  const [pages, setPages] = useState<Record<PanelKey, number>>({ artists: 1, recent: 1, albums: 1, tracks: 1 })
  const [loadingPanels, setLoadingPanels] = useState<Record<PanelKey, boolean>>({ artists: false, recent: false, albums: false, tracks: false })
  const [hasMore, setHasMore] = useState<Record<PanelKey, boolean>>({ artists: true, recent: true, albums: true, tracks: true })
  const [refreshedMusic, setRefreshedMusic] = useState<LastFmTaste | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [diaryRefreshKey, setDiaryRefreshKey] = useState(0)
  const currentMusic = refreshedMusic ?? music

  useEffect(() => {
    let cancelled = false

    async function restoreSavedPeriods() {
      const next = { ...DEFAULT_PERIODS }
      for (const key of Object.keys(next) as PanelKey[]) {
        const saved = window.localStorage.getItem('music-period-' + key)
        if (saved === '7day' || saved === '1month' || saved === 'overall') next[key] = saved
      }

      const periodsToLoad = [...new Set(Object.values(next).filter((period) => period !== 'overall'))]
      const fetched = await Promise.all(
        periodsToLoad.map(async (period) => {
          const response = await fetch('/api/music?period=' + period + '&page=1&limit=20')
          if (!response.ok) return null
          return [period, await response.json() as LastFmTaste] as const
        }),
      )

      if (cancelled) return
      setPeriods(next)
      const loaded = fetched.filter((entry): entry is readonly ['7day' | '1month', LastFmTaste] => entry !== null)
      if (loaded.length > 0) {
        setDatasets((current) => ({ ...current, ...Object.fromEntries(loaded) }))
      }
    }

    void restoreSavedPeriods()
    return () => { cancelled = true }
  }, [])

  async function changePeriod(key: PanelKey, value: string) {
    const period = value as LastFmPeriod
    setPeriods((current) => ({ ...current, [key]: period }))
    window.localStorage.setItem('music-period-' + key, period)
    if (datasets[period]) return

    const response = await fetch('/api/music?period=' + period)
    if (!response.ok) return
    const next = await response.json() as LastFmTaste
    setDatasets((current) => ({ ...current, [period]: next }))
  }
  async function refreshMusic() {
    setRefreshing(true)
    try {
      const response = await fetch('/api/music?period=overall&page=1&limit=20')
      if (!response.ok) return
      const next = await response.json() as LastFmTaste
      setRefreshedMusic(next)
      setDatasets((current) => ({ ...current, overall: next }))
      setDiaryRefreshKey((current) => current + 1)
      setPages({ artists: 1, recent: 1, albums: 1, tracks: 1 })
      setHasMore({ artists: true, recent: true, albums: true, tracks: true })
    } finally {
      setRefreshing(false)
    }
  }
  async function loadMore(key: PanelKey) {
    if (loadingPanels[key]) return
    const period = key === 'recent' ? 'overall' : periods[key]
    const nextPage = pages[key] + 1
    setLoadingPanels((current) => ({ ...current, [key]: true }))
    try {
      const response = await fetch('/api/music?period=' + period + '&page=' + nextPage + '&limit=20')
      if (!response.ok) return
      const incoming = await response.json() as LastFmTaste
      setDatasets((current) => {
        const existing = current[period] ?? music
        if (!existing) return current
        if (key === 'artists') return { ...current, [period]: { ...existing, topArtists: [...existing.topArtists, ...incoming.topArtists] } }
        if (key === 'recent') return { ...current, [period]: { ...existing, recentTracks: [...existing.recentTracks, ...incoming.recentTracks] } }
        if (key === 'albums') return { ...current, [period]: { ...existing, topAlbums: [...existing.topAlbums, ...incoming.topAlbums] } }
        return { ...current, [period]: { ...existing, topTracks: [...existing.topTracks, ...incoming.topTracks] } }
      })
      setPages((current) => ({ ...current, [key]: nextPage }))
      const count = key === 'artists' ? incoming.topArtists.length : key === 'recent' ? incoming.recentTracks.length : key === 'albums' ? incoming.topAlbums.length : incoming.topTracks.length
      if (count < 20) setHasMore((current) => ({ ...current, [key]: false }))
    } finally {
      setLoadingPanels((current) => ({ ...current, [key]: false }))
    }
  }
  if (!currentMusic) {
    return (
      <section
        id="music"
        className="relative overflow-hidden cursor-default border-y-2 border-dashed border-sky-dark/30 bg-gradient-to-br from-sky/20 via-cream to-mint/20 px-2 py-12 sm:px-4 sm:py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <Music2 size={28} className="inline-block align-middle mr-3 text-sky-dark pastel-float" aria-hidden="true" />
            <h2 className="pastel-heading inline-block text-3xl md:text-4xl">Audio Diary</h2>
            <Music2 size={28} className="inline-block align-middle ml-3 text-sky-dark pastel-float" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
          </div>
          <MusicEmptyState />
        </div>
      </section>
    )
  }

  const artists = datasets[periods.artists]?.topArtists ?? currentMusic.topArtists
  const recent = datasets[periods.recent]?.recentTracks ?? currentMusic.recentTracks
  const albums = datasets[periods.albums]?.topAlbums ?? currentMusic.topAlbums
  const tracks = datasets[periods.tracks]?.topTracks ?? currentMusic.topTracks

  const nowPlaying = currentMusic.recentTracks.find((track) => track.nowPlaying) ?? currentMusic.recentTracks[0] ?? null
  const profileSince = currentMusic.profile?.registered ? new Date(currentMusic.profile.registered).getFullYear() : null

  return (
    <section
      id="music"
      className="relative overflow-hidden cursor-default border-y-2 border-dashed border-sky-dark/30 bg-gradient-to-br from-sky/20 via-cream to-mint/20 px-2 py-12 sm:px-4 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 text-center sm:mb-10">
          <Music2 size={22} className="inline-block align-middle mr-2 text-sky-dark pastel-float sm:mr-3 sm:size-7" aria-hidden="true" />
          <h2 className="pastel-heading inline-block text-2xl sm:text-3xl md:text-4xl">Audio Diary</h2>
          <Music2 size={22} className="inline-block align-middle ml-2 text-sky-dark pastel-float sm:ml-3 sm:size-7" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-brown-light sm:mt-4 sm:text-sm">
            <Important size={13} className="fill-honey text-honey" aria-hidden="true" />
            Curated from my account on Last.fm
            <Important size={13} className="fill-honey text-honey" aria-hidden="true" />
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4">
          <article className="pastel-card bg-white/85 p-3 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-3xl border-2 border-sky-dark bg-cream shadow-sm sm:h-24 sm:w-24">
                {currentMusic.profile?.imageUrl ? (
                  <CuteImage
                    src={currentMusic.profile.imageUrl}
                    alt={currentMusic.profile.name}
                    fill
                    wrapperClassName="h-full w-full"
                    className="object-cover"
                    sizes="(max-width: 640px) 72px, 96px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cream-dark">
                    <Music2 size={28} className="text-brown-light sm:size-[34px]" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-brown-light sm:text-xs sm:tracking-[0.28em]">Listening Profile</p>
                  <button
                    type="button"
                    className="music-refresh-button flex items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] font-bold text-brown"
                    onClick={refreshMusic}
                    disabled={refreshing}
                    aria-label="Refresh listening profile"
                  >
                    <Refresh size={13} className={refreshing ? 'animate-spin' : ''} />
                    <span className="hidden sm:inline">{refreshing ? 'Refreshing…' : 'Refresh'}</span>
                  </button>
                </div>
                <h3 className="mt-1 text-lg font-extrabold text-ink sm:text-2xl">{currentMusic.profile?.name ?? currentMusic.username}</h3>
                {/* <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink/70">
                  I use Last.fm to keep track of the artists, albums, and songs that are living on repeat.
                </p> */}

                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                  <span className="pastel-badge bg-white">
                    <Flame size={11} aria-hidden="true" /> {formatCount(currentMusic.profile?.playcount ?? 0)} scrobbles
                  </span>
                  {currentMusic.profile?.country && (
                    <span className="pastel-badge bg-white">
                      <Radio size={11} aria-hidden="true" /> {currentMusic.profile.country}
                    </span>
                  )}
                  {profileSince && (
                    <span className="pastel-badge bg-white">
                      <Important size={11} aria-hidden="true" /> Since {profileSince}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-3xl border border-sky-dark/20 bg-gradient-to-br from-cream to-cream-dark p-3 sm:mt-5 sm:p-4">
              <div className="flex items-center gap-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-brown-light sm:text-xs sm:tracking-[0.24em]">
                <Radio size={12} aria-hidden="true" />
                {nowPlaying?.nowPlaying ? 'Now Playing' : 'Latest Spin'}
              </div>

              {nowPlaying ? (
                <div className="mt-3 flex items-start gap-3 sm:items-center">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-cream-dark bg-cream sm:h-16 sm:w-16">
                    {nowPlaying.imageUrl ? (
                      <CuteImage
                        src={nowPlaying.imageUrl}
                        alt={nowPlaying.name}
                        fill
                        wrapperClassName="h-full w-full"
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-cream-dark">
                        <Play size={18} className="text-brown-light sm:size-5" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-extrabold text-ink sm:text-base">{nowPlaying.name}</p>
                    <p className="truncate text-xs font-semibold text-brown-light sm:text-sm">{nowPlaying.artist}</p>
                    <p className="mt-1 text-[0.7rem] text-ink/55 sm:text-xs">
                      {nowPlaying.nowPlaying ? 'Streaming right now' : formatDate(nowPlaying.playedAt)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink/60">No recent tracks came back from Last.fm yet.</p>
              )}
            </div>

            <AudioDiary tracks={currentMusic.recentTracks} refreshKey={diaryRefreshKey} />

            {currentMusic.topTags.length > 0 && (
              <div className="mt-3 sm:mt-5">
                <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-brown-light sm:text-xs sm:tracking-[0.24em]">
                  <Important size={12} aria-hidden="true" />
                  Favorite Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentMusic.topTags.map((tag) => (
                    <TagChip key={tag.name} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </article>

          <div className="flex gap-2 overflow-x-auto pb-2 pr-1 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 sm:pr-0">
            <div className="w-[88vw] max-w-[22rem] shrink-0 sm:w-auto sm:max-w-none sm:min-w-0">
              <PanelShell title="Top Artists" icon={Disc3} period={periods.artists} onPeriodChange={(value) => changePeriod('artists', value)}>
                <InfiniteList onLoadMore={() => loadMore('artists')} hasMore={hasMore.artists} loading={loadingPanels.artists}>
                <div className="space-y-2">
                  {artists.map((artist, index) => (
                    <ArtistRow key={artist.name + '-' + index} artist={artist} />
                  ))}
                </div>
                </InfiniteList>
              </PanelShell>
            </div>

            <div className="w-[88vw] max-w-[22rem] shrink-0 sm:w-auto sm:max-w-none sm:min-w-0">
              <PanelShell title="Recent Tracks" icon={Radio}>
                <InfiniteList onLoadMore={() => loadMore('recent')} hasMore={hasMore.recent} loading={loadingPanels.recent}>
                <div className="space-y-2">
                  {recent.map((track, index) => (
                      <TrackRow key={track.name + '-' + (track.playedAt ?? track.artist) + '-' + index} track={track} compact />
                  ))}
                </div>
                </InfiniteList>
              </PanelShell>
            </div>

            <div className="w-[88vw] max-w-[22rem] shrink-0 sm:w-auto sm:max-w-none sm:min-w-0">
              <PanelShell title="Top Albums" icon={Headphones} period={periods.albums} onPeriodChange={(value) => changePeriod('albums', value)}>
                <InfiniteList onLoadMore={() => loadMore('albums')} hasMore={hasMore.albums} loading={loadingPanels.albums}>
                <div className="space-y-2">
                  {albums.map((album, index) => (
                    <AlbumRow key={album.name + '-' + album.artist + '-' + index} album={album} />
                  ))}
                </div>
                </InfiniteList>
              </PanelShell>
            </div>

            <div className="w-[88vw] max-w-[22rem] shrink-0 sm:w-auto sm:max-w-none sm:min-w-0">
              <PanelShell title="Top Tracks" icon={Flame} period={periods.tracks} onPeriodChange={(value) => changePeriod('tracks', value)}>
                <InfiniteList onLoadMore={() => loadMore('tracks')} hasMore={hasMore.tracks} loading={loadingPanels.tracks}>
                <div className="space-y-2">
                  {tracks.map((track, index) => (
                    <TrackRow key={track.name + '-' + track.artist + '-' + index} track={track} />
                  ))}
                </div>
                </InfiniteList>
              </PanelShell>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
