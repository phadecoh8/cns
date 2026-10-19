import express from 'express';
import { corsMiddleware } from './config/cors.js';
import { errorHandler } from './middleware/error-handler.js';
import { requestId } from './middleware/request-id.js';
import { securityHeaders } from './middleware/security-headers.js';
import { founderRouter } from './modules/founder/routes.js';
import { newsletterRouter } from './modules/newsletter/routes.js';
import { waitlistRouter } from './modules/waitlist/routes.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(requestId);
  app.use(securityHeaders);
  app.use(corsMiddleware);
  app.use(express.json({ limit: '16kb' }));

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/api/v1', founderRouter);
  app.use('/api/v1', waitlistRouter);
  app.use('/api/v1', newsletterRouter);
  app.use(errorHandler);

  return app;
}
