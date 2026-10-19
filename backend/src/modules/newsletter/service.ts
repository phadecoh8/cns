import {
  createHash, randomBytes 
} from 'node:crypto';
import {
  and, eq, lt 
} from 'drizzle-orm';
import { Resend } from 'resend';
import { env } from '../../config/env.js';
import { getWaitlistDb } from '../../db/waitlist/client.js';
import { newsletterSubscribers } from '../../db/waitlist/schema.js';

function hashToken(token: string) {
  return createHash('sha256').update(token)
    .digest('hex');
}

export async function subscribe(email: string) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return 'email_unavailable';
  }

  const db = getWaitlistDb();
  const expiredDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await db.delete(newsletterSubscribers).where(
    and(
      eq(newsletterSubscribers.confirmed, false),
      lt(newsletterSubscribers.createdAt, expiredDate),
    ),
  );

  const [existing] = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, email))
    .limit(1);

  if (existing?.confirmed) {
    return 'already_subscribed';
  }

  const token = randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);
  const createdAt = new Date();

  if (existing) {
    await db
      .update(newsletterSubscribers)
      .set({
        tokenHash,
        createdAt 
      })
      .where(eq(newsletterSubscribers.id, existing.id));
  } else {
    await db.insert(newsletterSubscribers).values({
      email,
      tokenHash 
    });
  }

  const confirmUrl = new URL('/newsletter/confirm', env.FRONTEND_URL);
  confirmUrl.searchParams.set('token', token);
  const unsubscribeUrl = new URL('/newsletter/unsubscribe', env.FRONTEND_URL);
  unsubscribeUrl.searchParams.set('token', token);
  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: email,
    subject: 'Confirm your CNS updates',
    text: [
      `Confirm your subscription: ${confirmUrl.toString()}`,
      `Unsubscribe: ${unsubscribeUrl.toString()}`,
    ].join('\n\n'),
  });

  return 'pending_confirmation';
}

export async function confirmSubscription(token: string) {
  const db = getWaitlistDb();
  const [subscriber] = await db
    .select({ id: newsletterSubscribers.id })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.tokenHash, hashToken(token)))
    .limit(1);

  if (!subscriber) {
    return false;
  }

  await db
    .update(newsletterSubscribers)
    .set({
      confirmed: true,
      confirmedAt: new Date() 
    })
    .where(eq(newsletterSubscribers.id, subscriber.id));

  return true;
}

export async function unsubscribe(token: string) {
  const db = getWaitlistDb();
  const result = await db
    .delete(newsletterSubscribers)
    .where(eq(newsletterSubscribers.tokenHash, hashToken(token)))
    .returning({ id: newsletterSubscribers.id });

  return result.length > 0;
}
