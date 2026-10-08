import { Router } from 'express';
import { rateLimit } from '../../middleware/rate-limit.js';
import {
  confirmNewsletter,
  registerNewsletter,
  unsubscribeNewsletter,
} from './controller.js';

export const newsletterRouter = Router();

newsletterRouter.post(
  '/newsletter',
  rateLimit('newsletter', 5, 15 * 60 * 1000),
  registerNewsletter,
);
newsletterRouter.get('/newsletter/confirm', confirmNewsletter);
newsletterRouter.get('/newsletter/unsubscribe', unsubscribeNewsletter);
