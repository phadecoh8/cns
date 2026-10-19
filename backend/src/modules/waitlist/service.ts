import {
  and, desc, ilike, or, sql 
} from 'drizzle-orm';
import { getWaitlistDb } from '../../db/waitlist/client.js';
import { waitlistEntries } from '../../db/waitlist/schema.js';
import type { z } from 'zod';
import type {
  createWaitlistEntrySchema,
  waitlistQuerySchema,
} from './schema.js';

type CreateEntry = z.infer<typeof createWaitlistEntrySchema>;
type Query = z.infer<typeof waitlistQuerySchema>;

export async function createEntry(input: CreateEntry) {
  const db = getWaitlistDb();
  const [entry] = await db
    .insert(waitlistEntries)
    .values({
      name: input.name,
      school: input.school,
      faculty: input.faculty,
      department: input.department,
      level: input.level,
      email: input.email,
      consent: input.consent === 'true',
    })
    .onConflictDoNothing({ target: waitlistEntries.email })
    .returning({ id: waitlistEntries.id });

  return entry ? 'created' : 'already_registered';
}

export async function listEntries(query: Query) {
  const db = getWaitlistDb();
  const offset = (query.page - 1) * query.pageSize;
  const filter = query.search
    ? or(
      ilike(waitlistEntries.name, `%${query.search}%`),
      ilike(waitlistEntries.school, `%${query.search}%`),
      ilike(waitlistEntries.faculty, `%${query.search}%`),
      ilike(waitlistEntries.department, `%${query.search}%`),
      ilike(waitlistEntries.email, `%${query.search}%`),
    )
    : undefined;
  const rows = await db
    .select()
    .from(waitlistEntries)
    .where(filter ? and(filter) : undefined)
    .orderBy(desc(waitlistEntries.createdAt))
    .limit(query.pageSize)
    .offset(offset);
  const [count] = await db
    .select({ count: sql<number>`count(*)` })
    .from(waitlistEntries)
    .where(filter ? and(filter) : undefined);

  return {
    entries: rows,
    total: Number(count?.count ?? 0),
    page: query.page,
    pageSize: query.pageSize,
  };
}
