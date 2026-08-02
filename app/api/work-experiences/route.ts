import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrl } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query(
      'SELECT * FROM work_experiences ORDER BY sort_order ASC, start_date DESC',
    )

    const rows = await Promise.all(
      result.rows.map(async (row) => ({
        ...row,
        logo_url: await getPresignedUrl(row.logo_key),
      })),
    )

    return Response.json({ data: rows })
  } catch (err) {
    console.error('[/api/work-experiences] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { company, role, description, start_date, end_date, logo_key, company_url, sort_order } =
      await req.json()

    const result = await db.query(
      `INSERT INTO work_experiences
        (company, role, description, start_date, end_date, logo_key, company_url, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        company,
        role,
        description ?? null,
        start_date,
        end_date ?? null,
        logo_key ?? null,
        company_url ?? null,
        sort_order ?? 0,
      ],
    )

    return Response.json({ data: result.rows[0] }, { status: 201 })
  } catch (err) {
    console.error('[/api/work-experiences] POST error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
