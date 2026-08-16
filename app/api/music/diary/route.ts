import { NextResponse } from 'next/server'

type DiaryTrack = { name?: unknown; artist?: unknown; album?: unknown; nowPlaying?: unknown }

function clean(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 160) : fallback
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Gemini is not configured yet.' }, { status: 503 })

  let body: { tracks?: DiaryTrack[] }
  try { body = await request.json() as { tracks?: DiaryTrack[] } } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const tracks = Array.isArray(body.tracks) ? body.tracks.slice(0, 20).map((track) => ({
    title: clean(track.name, 'Unknown track'), artist: clean(track.artist, 'Unknown artist'),
    album: clean(track.album, 'No album listed'), nowPlaying: track.nowPlaying === true,
  })) : []
  if (!tracks.length) return NextResponse.json({ error: 'There are no recent tracks to write about.' }, { status: 400 })

  const prompt = [
    'Write a tiny, diary-like listening entry based only on the recent tracks below.',
    'Use a warm, personal, slightly poetic voice. Reference one or more artists who actually appear in the recent plays, but do not name any songs, albums, or other track metadata. Do not claim emotions, events, genres, or intentions that the list does not support.',
    'Do not mention AI, Last.fm, prompts, or the data source. Keep it to 2 or 3 sentences and under 80 words.', '', JSON.stringify(tracks),
  ].join('\n')
  const model = (process.env.GEMINI_MODEL?.trim() || 'gemini-3.6-flash').replace(/^models\//, '')

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 2000 } }),
      cache: 'no-store',
    })
    if (!response.ok) {
      const failure = await response.json() as { error?: { message?: string; status?: string } }
      console.error('Diary request failed:', response.status, failure.error?.status ?? 'Unknown status', failure.error?.message ?? 'Unknown error')
      return NextResponse.json({ error: 'Could not write the diary entry.' }, { status: 502 })
    }
    const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
    const entry = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim()
    if (!entry) return NextResponse.json({ error: 'API returned an empty diary entry.' }, { status: 502 })
    return NextResponse.json({ entry })
  } catch { return NextResponse.json({ error: 'Unable to generate diary entry right now.' }, { status: 502 }) }
}
