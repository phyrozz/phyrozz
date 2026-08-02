import db from '@/lib/db'

export async function GET() {
  // Step 1: basic connection
  try {
    const conn = await db.query('SELECT NOW() AS time, current_database() AS database')

    // Step 2: check tables exist
    const tables = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name IN ('personal_info','socials','projects','hobbies','work_experiences','tips_mantras')
      ORDER BY table_name
    `)

    const foundTables = tables.rows.map((r: { table_name: string }) => r.table_name)
    const expectedTables = ['hobbies', 'personal_info', 'projects', 'socials', 'tips_mantras', 'work_experiences']
    const missingTables = expectedTables.filter((t) => !foundTables.includes(t))

    return Response.json({
      connected: true,
      database: conn.rows[0].database,
      time: conn.rows[0].time,
      tables: {
        found: foundTables,
        missing: missingTables,
        ready: missingTables.length === 0,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json({ connected: false, error: message }, { status: 500 })
  }
}
