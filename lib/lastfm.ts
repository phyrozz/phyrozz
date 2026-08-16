type LastFmImage = {
  size?: string
  '#text'?: string
}

type LastFmNamedItem = {
  name?: string
  '#text'?: string
  url?: string
  image?: LastFmImage[]
}

type LastFmTrackItem = LastFmNamedItem & {
  artist?: LastFmNamedItem | string
  album?: LastFmNamedItem | string
  '@attr'?: { nowplaying?: string }
  date?: { uts?: string }
}

export type LastFmProfile = {
  name: string
  playcount: number
  registered?: string | null
  country?: string | null
  imageUrl: string | null
  url: string | null
}

export type LastFmTrack = {
  name: string
  artist: string
  album: string | null
  url: string
  imageUrl: string | null
  nowPlaying: boolean
  playedAt: string | null
  playcount?: number
}

export type LastFmArtist = {
  name: string
  playcount: number
  url: string
  imageUrl: string | null
}

export type LastFmAlbum = {
  name: string
  artist: string
  playcount: number
  url: string
  imageUrl: string | null
}

export type LastFmTag = {
  name: string
  count: number
  url: string
}

export type LastFmPeriod = '7day' | '1month' | 'overall'

export type LastFmTaste = {
  username: string
  profile: LastFmProfile | null
  recentTracks: LastFmTrack[]
  topArtists: LastFmArtist[]
  topTracks: LastFmTrack[]
  topAlbums: LastFmAlbum[]
  topTags: LastFmTag[]
}

const API_URL = 'https://ws.audioscrobbler.com/2.0/'
const DEFAULT_USERNAME = 'Phyrozz'

function requireApiKey() {
  const apiKey = process.env.LASTFM_API_KEY
  if (!apiKey) {
    throw new Error('LASTFM_API_KEY is not set.')
  }
  return apiKey
}

function getUsername() {
  return process.env.LASTFM_USERNAME?.trim() || DEFAULT_USERNAME
}

function getText(value: unknown) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const candidate = record.name ?? record['#text'] ?? record.text ?? record.value
    if (typeof candidate === 'string') return candidate
  }
  return ''
}

function getUrl(value: unknown) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const candidate = record.url
    if (typeof candidate === 'string') return candidate
  }
  return ''
}

function getImageList(value: unknown): LastFmImage[] {
  if (!value) return []
  if (Array.isArray(value)) return value as LastFmImage[]
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    const candidate = record.image
    if (Array.isArray(candidate)) return candidate as LastFmImage[]
  }
  return []
}

function pickImageUrl(images: LastFmImage[] | undefined) {
  if (!images || images.length === 0) return null
  const preferred =
    images.find((image) => image.size === 'extralarge' && image['#text']) ??
    images.find((image) => image.size === 'large' && image['#text']) ??
    images.find((image) => image.size === 'medium' && image['#text']) ??
    images.find((image) => image['#text'])

  return preferred?.['#text'] ?? null
}

function pickBestImage(...sources: unknown[]) {
  for (const source of sources) {
    const imageUrl = pickImageUrl(getImageList(source))
    if (imageUrl) return imageUrl
  }
  return null
}

async function lastFmRequest<T>(
  method: string,
  params: Record<string, string | number | undefined> = {},
  options: { userParam?: 'user' | 'username' } = {},
): Promise<T> {
  const url = new URL(API_URL)
  const searchParams = new URLSearchParams({
    method,
    api_key: requireApiKey(),
    format: 'json',
    ...Object.fromEntries(
      Object.entries(params).flatMap(([key, value]) => (value === undefined ? [] : [[key, String(value)]])),
    ),
  })

  if (options.userParam) {
    searchParams.set(options.userParam, getUsername())
  }

  url.search = searchParams.toString()

  const response = await fetch(url.toString(), { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Last.fm request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

function toNumber(value: unknown, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function normalizeTrack(track: LastFmTrackItem): LastFmTrack {
  const artist = track.artist
  const album = track.album

  return {
    name: getText(track) || 'Unknown track',
    artist: getText(artist) || 'Unknown artist',
    album: getText(album) || null,
    url: getUrl(track) || '#',
    imageUrl: pickBestImage(track, artist, album),
    nowPlaying: track['@attr']?.nowplaying === 'true',
    playedAt: track.date?.uts ? new Date(Number(track.date.uts) * 1000).toISOString() : null,
  }
}

function normalizeArtist(artist: LastFmNamedItem): LastFmArtist {
  return {
    name: getText(artist) || 'Unknown artist',
    playcount: toNumber((artist as Record<string, unknown>).playcount),
    url: getUrl(artist) || '#',
    imageUrl: pickBestImage(artist),
  }
}

function normalizeAlbum(album: LastFmNamedItem & { artist?: LastFmNamedItem | string }): LastFmAlbum {
  return {
    name: getText(album) || 'Unknown album',
    artist: getText(album.artist) || 'Unknown artist',
    playcount: toNumber((album as Record<string, unknown>).playcount),
    url: getUrl(album) || '#',
    imageUrl: pickBestImage(album, album.artist),
  }
}

function normalizeArtistInfo(artist: { image?: LastFmImage[] }) {
  return pickImageUrl(artist.image)
}

function normalizeTrackInfo(track: { image?: LastFmImage[]; album?: LastFmNamedItem | string; artist?: LastFmNamedItem | string }) {
  return {
    imageUrl: pickBestImage(track, track.artist, track.album),
  }
}

export async function loadLastFmTaste(period: LastFmPeriod = 'overall', page = 1, limit = 20): Promise<LastFmTaste> {
  const username = getUsername()

  const [profileRes, recentRes, artistsRes, tracksRes, albumsRes, tagsRes] = await Promise.allSettled([
    lastFmRequest<{
      user?: {
        name?: string
        playcount?: string
        registered?: { unixtime?: string }
        country?: string
        url?: string
        image?: LastFmImage[]
      }
    }>('user.getInfo', { user: username }, { userParam: 'user' }),
    lastFmRequest<{
      recenttracks?: {
        track?: LastFmTrackItem[] | LastFmTrackItem
      }
    }>('user.getRecentTracks', { user: username, limit, page, extended: 1, ...(period === 'overall' ? {} : { from: Math.floor(Date.now() / 1000) - (period === '7day' ? 7 : 30) * 86400 }) }, { userParam: 'user' }),
    lastFmRequest<{
      topartists?: {
        artist?: LastFmNamedItem[] | LastFmNamedItem
      }
    }>('user.getTopArtists', { user: username, limit, page, period }, { userParam: 'user' }),
    lastFmRequest<{
      toptracks?: {
        track?: Array<LastFmTrackItem & { playcount?: string }> | (LastFmTrackItem & { playcount?: string })
      }
    }>('user.getTopTracks', { user: username, limit, page, period }, { userParam: 'user' }),
    lastFmRequest<{
      topalbums?: {
        album?: Array<LastFmNamedItem & { artist?: LastFmNamedItem | string; playcount?: string }> | (LastFmNamedItem & { artist?: LastFmNamedItem | string; playcount?: string })
      }
    }>('user.getTopAlbums', { user: username, limit, page, period }, { userParam: 'user' }),
    lastFmRequest<{
      toptags?: {
        tag?: Array<{ name?: string; count?: string; url?: string }> | { name?: string; count?: string; url?: string }
      }
    }>('user.getTopTags', { user: username, limit: 8 }, { userParam: 'user' }),
  ])

  const profileJson = profileRes.status === 'fulfilled' ? profileRes.value : null
  const recentJson = recentRes.status === 'fulfilled' ? recentRes.value : null
  const artistsJson = artistsRes.status === 'fulfilled' ? artistsRes.value : null
  const tracksJson = tracksRes.status === 'fulfilled' ? tracksRes.value : null
  const albumsJson = albumsRes.status === 'fulfilled' ? albumsRes.value : null
  const tagsJson = tagsRes.status === 'fulfilled' ? tagsRes.value : null

  const recentTracksRaw = recentJson?.recenttracks?.track
    ? Array.isArray(recentJson.recenttracks.track)
      ? recentJson.recenttracks.track
      : [recentJson.recenttracks.track]
    : []

  const topArtistsRaw = artistsJson?.topartists?.artist
    ? Array.isArray(artistsJson.topartists.artist)
      ? artistsJson.topartists.artist
      : [artistsJson.topartists.artist]
    : []

  const topTracksRaw = tracksJson?.toptracks?.track
    ? Array.isArray(tracksJson.toptracks.track)
      ? tracksJson.toptracks.track
      : [tracksJson.toptracks.track]
    : []

  const topAlbumsRaw = albumsJson?.topalbums?.album
    ? Array.isArray(albumsJson.topalbums.album)
      ? albumsJson.topalbums.album
      : [albumsJson.topalbums.album]
    : []

  const topTagsRaw = tagsJson?.toptags?.tag
    ? Array.isArray(tagsJson.toptags.tag)
      ? tagsJson.toptags.tag
      : [tagsJson.toptags.tag]
    : []

  const artistDetails = await Promise.allSettled(
    topArtistsRaw.map((artist) =>
      lastFmRequest<{ artist?: { image?: LastFmImage[] } }>(
        'artist.getInfo',
        {
          artist: getText(artist),
          autocorrect: 1,
        },
        { userParam: 'username' },
      ),
    ),
  )

  const trackDetails = await Promise.allSettled(
    topTracksRaw.map((track) =>
      lastFmRequest<{ track?: { image?: LastFmImage[]; album?: LastFmNamedItem | string; artist?: LastFmNamedItem | string } }>(
        'track.getInfo',
        {
          artist: getText(track.artist),
          track: getText(track),
          autocorrect: 1,
        },
        { userParam: 'username' },
      ),
    ),
  )

  const artistImageOverrides = artistDetails.map((result) =>
    result.status === 'fulfilled' ? normalizeArtistInfo(result.value.artist ?? {}) : null,
  )

  const trackImageOverrides = trackDetails.map((result) =>
    result.status === 'fulfilled' ? normalizeTrackInfo(result.value.track ?? {}) : null,
  )

  return {
    username,
    profile: profileJson?.user
      ? {
          name: profileJson.user.name ?? username,
          playcount: toNumber(profileJson.user.playcount),
          registered: profileJson.user.registered?.unixtime
            ? new Date(Number(profileJson.user.registered.unixtime) * 1000).toISOString()
            : null,
          country: profileJson.user.country ?? null,
          imageUrl: pickImageUrl(profileJson.user.image),
          url: profileJson.user.url ?? null,
        }
      : null,
    recentTracks: recentTracksRaw.slice(0, limit).map(normalizeTrack),
    topArtists: topArtistsRaw.slice(0, limit).map((artist, index) => {
      const normalized = normalizeArtist(artist)
      return {
        ...normalized,
        imageUrl: artistImageOverrides[index] ?? normalized.imageUrl,
      }
    }),
    topTracks: topTracksRaw.slice(0, limit).map((track, index) => {
      const normalized = normalizeTrack(track)
      const override = trackImageOverrides[index]
      return {
        ...normalized,
        imageUrl: override?.imageUrl ?? normalized.imageUrl,
        playcount: toNumber((track as Record<string, unknown>).playcount),
      }
    }),
    topAlbums: topAlbumsRaw.slice(0, limit).map((album) =>
      normalizeAlbum(album as LastFmNamedItem & { artist?: LastFmNamedItem | string; playcount?: string }),
    ),
    topTags: topTagsRaw.slice(0, 8).map((tag) => ({
      name: tag.name ?? 'Unknown',
      count: toNumber(tag.count),
      url: tag.url ?? '#',
    })),
  }
}
