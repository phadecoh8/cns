import { z } from 'zod';

export const newsletterSchema = z.object({email: z.string().trim()
  .email()
  .max(254)
  .transform((value) => value.toLowerCase()),});

export const tokenSchema = z.object({token: z.string().min(40)
  .max(160),});
