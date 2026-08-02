import { NextRequest } from 'next/server'
import db from '@/lib/db'
import { getPresignedUrls } from '@/lib/s3'

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM personal_info LIMIT 1')
    const row = result.rows[0] ?? null

    if (!row) {
      return Response.json({ data: null })
    }

    const [avatarUrl, bannerUrl, resumeUrl] = await getPresignedUrls([
      row.avatar_key,
      row.banner_key,
      row.resume_key,
    ])

    return Response.json({
      data: {
        ...row,
        avatar_url: avatarUrl,
        banner_url: bannerUrl,
        resume_url: resumeUrl,
      },
    })
  } catch (err) {
    console.error('[/api/personal-info] GET error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      full_name, nickname, tagline, bio, email, mobile, city, country, birthdate,
      avatar_key, banner_key, resume_key,
    } = body

    await db.query(
      `INSERT INTO personal_info
        (full_name, nickname, tagline, bio, email, mobile, city, country, birthdate, avatar_key, banner_key, resume_key)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (id) DO UPDATE SET
         full_name=$1, nickname=$2, tagline=$3, bio=$4, email=$5, mobile=$6,
         city=$7, country=$8, birthdate=$9, avatar_key=$10, banner_key=$11, resume_key=$12`,
      [full_name, nickname ?? null, tagline, bio, email, mobile, city, country, birthdate, avatar_key, banner_key, resume_key],
    )

    return Response.json({ success: true })
  } catch (err) {
    console.error('[/api/personal-info] PUT error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
