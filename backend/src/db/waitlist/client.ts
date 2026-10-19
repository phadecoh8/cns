import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../../config/env.js';
import * as schema from './schema.js';

let pool: Pool | undefined;

export function getWaitlistDb() {
  if (!env.WAITLIST_DATABASE_URL) {
    throw new Error('Waitlist database is not configured.');
  }

  pool ??= new Pool({ connectionString: env.WAITLIST_DATABASE_URL });
  return drizzle(pool, { schema });
}

export async function closeWaitlistDb() {
  await pool?.end();
  pool = undefined;
}
