import { z } from 'zod';

const emptyAsUndefined = (value: unknown) => (
  value === '' ? undefined : value
);

const envSchema = z.object({
  PORT: z.preprocess(
    emptyAsUndefined,
    z.coerce.number().int()
      .positive()
      .default(4000),
  ),
  WAITLIST_DATABASE_URL: z.preprocess(
    emptyAsUndefined,
    z.string().optional(),
  ),
  FOUNDER_EMAIL: z.preprocess(
    emptyAsUndefined,
    z.string().email()
      .optional(),
  ),
  FOUNDER_DASHBOARD_PASSWORD: z.preprocess(
    emptyAsUndefined,
    z.string().min(12)
      .optional(),
  ),
  FRONTEND_URL: z.preprocess(
    emptyAsUndefined,
    z.string().url()
      .default('http://localhost:3000'),
  ),
  RESEND_API_KEY: z.preprocess(
    emptyAsUndefined,
    z.string().optional(),
  ),
  RESEND_FROM_EMAIL: z.preprocess(
    emptyAsUndefined,
    z.string().email()
      .optional(),
  ),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

export const env = envSchema.parse(process.env);
