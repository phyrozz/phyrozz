import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrl } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM hobbies ORDER BY sort_order ASC')

    const rows = await Promise.all(
      result.rows.map(async (row) => ({
        ...row,
        image_url: await getPresignedUrl(row.image_key),
      })),
    )

    return Response.json({ data: rows })
  } catch (err) {
    console.error('[/api/hobbies] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, image_key, sort_order } = await req.json()

    const result = await db.query(
      `INSERT INTO hobbies (name, description, image_key, sort_order)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, description ?? null, image_key ?? null, sort_order ?? 0],
    )

    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/hobbies] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
