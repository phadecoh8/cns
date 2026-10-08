import { z } from 'zod';

export const createWaitlistEntrySchema = z.object({
  name: z.string().trim()
    .min(1)
    .max(120),
  school: z.string().trim()
    .min(1)
    .max(180),
  faculty: z.string().trim()
    .min(1)
    .max(180),
  department: z.string().trim()
    .min(1)
    .max(180),
  level: z.string().trim()
    .min(1)
    .max(30),
  email: z.string().trim()
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  consent: z.literal('true'),
  website: z.string().max(0),
  startedAt: z.coerce.number().int()
    .positive(),
});

export const waitlistQuerySchema = z.object({
  page: z.coerce.number().int()
    .min(1)
    .default(1),
  pageSize: z.coerce.number().int()
    .min(1)
    .max(100)
    .default(25),
  search: z.string().trim()
    .max(180)
    .default(''),
});
