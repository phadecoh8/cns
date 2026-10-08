import {
  createHash, timingSafeEqual 
} from 'node:crypto';
import type {
  Request, Response 
} from 'express';
import { env } from '../../config/env.js';
import {
  sessionCookieName,
  sessionDurationSeconds,
} from '../../config/constants.js';
import { createFounderCookie } from '../../middleware/founder-session.js';
import { founderLoginSchema } from './schema.js';

function equalSecret(left: string, right: string) {
  const leftHash = createHash('sha256').update(left)
    .digest();
  const rightHash = createHash('sha256').update(right)
    .digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function loginFounder(request: Request, response: Response) {
  const input = founderLoginSchema.safeParse(request.body);

  if (!input.success || !env.FOUNDER_EMAIL || !env.FOUNDER_DASHBOARD_PASSWORD) {
    response.status(401).json({ message: 'Email or password is incorrect.' });
    return;
  }

  const emailMatches = equalSecret(
    input.data.email.toLowerCase(),
    env.FOUNDER_EMAIL.toLowerCase(),
  );
  const passwordMatches = equalSecret(
    input.data.password,
    env.FOUNDER_DASHBOARD_PASSWORD,
  );

  if (!emailMatches || !passwordMatches) {
    response.status(401).json({ message: 'Email or password is incorrect.' });
    return;
  }

  const secure = env.NODE_ENV === 'production' ? 'Secure' : '';
  const cookie = createFounderCookie(input.data.email);
  const cookieParts = [
    `${sessionCookieName}=${cookie}`,
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${sessionDurationSeconds}`,
    secure,
  ].filter(Boolean);
  response.setHeader(
    'Set-Cookie',
    cookieParts.join('; '),
  );
  response.json({ ok: true });
}

export function logoutFounder(_request: Request, response: Response) {
  const secure = env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`,
  );
  response.json({ ok: true });
}
