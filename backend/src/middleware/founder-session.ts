import {
  createHmac, timingSafeEqual 
} from 'node:crypto';
import type { RequestHandler } from 'express';
import { env } from '../config/env.js';
import {
  sessionCookieName,
  sessionDurationSeconds,
} from '../config/constants.js';

type SessionPayload = {
  email: string;
  expiresAt: number;
};

function signature(value: string) {
  const secret = env.FOUNDER_DASHBOARD_PASSWORD ?? '';
  return createHmac('sha256', secret).update(value)
    .digest('base64url');
}

export function createFounderCookie(email: string) {
  const payload: SessionPayload = {
    email: email.toLowerCase(),
    expiresAt: Date.now() + sessionDurationSeconds * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${signature(encoded)}`;
}

function readCookie(requestCookie: string | undefined) {
  const pair = requestCookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`));

  return pair?.slice(sessionCookieName.length + 1);
}

export function isFounderCookieValid(value: string | undefined) {
  if (
    !value
    || !env.FOUNDER_EMAIL
    || !env.FOUNDER_DASHBOARD_PASSWORD
  ) {
    return false;
  }

  const [encoded, suppliedSignature] = value.split('.');

  if (!encoded || !suppliedSignature) {
    return false;
  }

  const expected = Buffer.from(signature(encoded));
  const supplied = Buffer.from(suppliedSignature);

  if (
    expected.length !== supplied.length
    || !timingSafeEqual(expected, supplied)
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8'),
    ) as SessionPayload;

    return payload.email === env.FOUNDER_EMAIL.toLowerCase()
      && payload.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export const founderSession: RequestHandler = (request, response, next) => {
  const cookie = readCookie(request.header('cookie'));

  if (!isFounderCookieValid(cookie)) {
    response.status(401).json({error: {
      code: 'UNAUTHENTICATED',
      message: 'Sign in to continue.',
    },});
    return;
  }

  next();
};
