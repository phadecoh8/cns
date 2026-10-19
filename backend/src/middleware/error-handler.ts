import type { ErrorRequestHandler } from 'express';
import { AppError } from '../utils/errors.js';
import { logEvent } from '../utils/logger.js';

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  const requestId = String(response.locals.requestId ?? 'unknown');

  if (error instanceof AppError) {
    response.status(error.statusCode).json({error: {
      code: error.code,
      message: error.message,
      requestId,
    },});
    return;
  }

  logEvent('request_failed', requestId);
  response.status(500).json({error: {
    code: 'INTERNAL_ERROR',
    message: 'The request could not be completed.',
    requestId,
  },});
};
