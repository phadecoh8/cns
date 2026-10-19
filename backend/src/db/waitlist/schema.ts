import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const waitlistEntries = pgTable(
  'waitlist_entries',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 120 }).notNull(),
    school: varchar('school', { length: 180 }).notNull(),
    faculty: varchar('faculty', { length: 180 }).notNull(),
    department: varchar('department', { length: 180 }).notNull(),
    level: varchar('level', { length: 30 }).notNull(),
    email: varchar('email', { length: 254 }).notNull(),
    consent: boolean('consent').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('waitlist_entries_email_unique').on(table.email),
    index('waitlist_entries_created_at_idx').on(table.createdAt),
  ],
);

export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 254 }).notNull(),
    tokenHash: text('token_hash').notNull(),
    confirmed: boolean('confirmed').notNull()
      .default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
  },
  (table) => [
    uniqueIndex('newsletter_subscribers_email_unique').on(table.email),
    index('newsletter_subscribers_created_at_idx').on(table.createdAt),
  ],
);
