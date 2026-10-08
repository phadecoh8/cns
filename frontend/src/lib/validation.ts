import { z } from 'zod';

export const waitlistInputSchema = z.object({
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
    .max(254),
  consent: z.literal('true'),
  website: z.string().max(0),
  startedAt: z.coerce.number().int()
    .positive(),
});

export const newsletterInputSchema = z.object({email: z.string().trim()
  .email()
  .max(254),});
