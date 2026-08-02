import { NextRequest } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM tips_mantras ORDER BY sort_order ASC')
    return Response.json({ data: result.rows })
  } catch (err) {
    console.error('[/api/tips-mantras] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content, category, author, sort_order } = await req.json()

    const result = await db.query(
      `INSERT INTO tips_mantras (content, category, author, sort_order)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [content, category ?? null, author ?? null, sort_order ?? 0],
    )

    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/tips-mantras] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
