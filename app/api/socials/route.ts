import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrl } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM socials ORDER BY sort_order ASC')

    const rows = await Promise.all(
      result.rows.map(async (row) => ({
        ...row,
        icon_url: await getPresignedUrl(row.icon_key),
      })),
    )

    return Response.json({ data: rows })
  } catch (err) {
    console.error('[/api/socials] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { platform, url, icon_key, sort_order } = await req.json()
    const result = await db.query(
      `INSERT INTO socials (platform, url, icon_key, sort_order)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [platform, url, icon_key ?? null, sort_order ?? 0],
    )
    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/socials] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
