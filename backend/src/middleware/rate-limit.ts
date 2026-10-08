import type { RequestHandler } from 'express';
import { allowRequest } from '../config/rate-limits.js';

export function rateLimit(
  name: string,
  limit: number,
  windowMs: number,
): RequestHandler {
  return (request, response, next) => {
    const key = `${name}:${request.ip ?? 'unknown'}`;

    if (!allowRequest(key, limit, windowMs)) {
      response.status(429).json({error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Try again later.',
      },});
      return;
    }

    next();
  };
}
