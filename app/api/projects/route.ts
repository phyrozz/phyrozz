import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrl } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM projects ORDER BY is_featured DESC, sort_order ASC',
    )

    const rows = await Promise.all(
      result.rows.map(async (row) => ({
        ...row,
        image_url: await getPresignedUrl(row.image_key),
      })),
    )

    return Response.json({ data: rows })
  } catch (err) {
    console.error('[/api/projects] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, tech_stack, github_url, live_url, image_key, is_featured, sort_order } =
      await req.json()

    const result = await db.query(
      `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_key, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        title,
        description ?? null,
        tech_stack ?? [],
        github_url ?? null,
        live_url ?? null,
        image_key ?? null,
        is_featured ?? false,
        sort_order ?? 0,
      ],
    )

    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/projects] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
