import { NextResponse } from 'next/server'
import { loadLastFmTaste, type LastFmPeriod } from '@/lib/lastfm'

const PERIODS: LastFmPeriod[] = ['7day', '1month', 'overall']

export async function GET(request: Request) {
  const value = new URL(request.url).searchParams.get('period')
  const period = PERIODS.includes(value as LastFmPeriod) ? value as LastFmPeriod : 'overall'
  const params = new URL(request.url).searchParams
  const pageValue = Number(params.get('page') ?? '1')
  const limitValue = Number(params.get('limit') ?? '20')
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1
  const limit = Number.isInteger(limitValue) && limitValue > 0 && limitValue <= 20 ? limitValue : 20

  try {
    return NextResponse.json(await loadLastFmTaste(period, page, limit))
  } catch {
    return NextResponse.json({ error: 'Unable to load music data.' }, { status: 500 })
  }
}
