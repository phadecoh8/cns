import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

export const requestId: RequestHandler = (_request, response, next) => {
  const id = randomUUID();
  response.setHeader('X-Request-Id', id);
  response.locals.requestId = id;
  next();
};
