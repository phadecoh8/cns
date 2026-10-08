import { Router } from 'express';
import { founderSession } from '../../middleware/founder-session.js';
import { rateLimit } from '../../middleware/rate-limit.js';
import {
  getWaitlistEntries,
  registerForWaitlist,
} from './controller.js';

export const waitlistRouter = Router();

waitlistRouter.post(
  '/waitlist',
  rateLimit('waitlist', 5, 15 * 60 * 1000),
  registerForWaitlist,
);
waitlistRouter.get(
  '/admin/waitlist',
  founderSession,
  getWaitlistEntries,
);
