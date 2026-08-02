import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrls } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM cosplays ORDER BY is_featured DESC, sort_order ASC',
    )

    const rows = await Promise.all(
      result.rows.map(async (row) => ({
        ...row,
        // Resolve every photo key in the image_keys array to a presigned URL
        image_urls: await getPresignedUrls(row.image_keys ?? []),
      })),
    )

    return Response.json({ data: rows })
  } catch (err) {
    console.error('[/api/cosplays] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      character_name,
      series,
      description,
      image_keys,
      event,
      event_date,
      is_featured,
      sort_order,
    } = await req.json()

    const result = await db.query(
      `INSERT INTO cosplays
        (character_name, series, description, image_keys, event, event_date, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        character_name,
        series       ?? null,
        description  ?? null,
        image_keys   ?? [],
        event        ?? null,
        event_date   ?? null,
        is_featured  ?? false,
        sort_order   ?? 0,
      ],
    )

    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/cosplays] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
