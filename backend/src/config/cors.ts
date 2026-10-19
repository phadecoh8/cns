import type { RequestHandler } from 'express';
import { env } from './env.js';

export const corsMiddleware: RequestHandler = (request, response, next) => {
  const origin = request.header('origin');

  if (origin && origin === env.FRONTEND_URL) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Request-Id',
    );
    response.setHeader('Vary', 'Origin');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
};
