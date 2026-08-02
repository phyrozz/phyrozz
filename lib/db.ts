import { Pool } from 'pg'

// A single Pool instance is reused across all requests in the same Node.js process.
// Next.js may hot-reload in dev, so we cache it on globalThis to avoid leaking connections.
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set.')
  }
  return new Pool({ connectionString })
}

const db: Pool = globalThis._pgPool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
  globalThis._pgPool = db
}

export default db
