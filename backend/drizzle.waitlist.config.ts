import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/waitlist/schema.ts',
  out: './src/db/waitlist/migrations',
  dbCredentials: {url: process.env.WAITLIST_DATABASE_URL ?? '',},
});
