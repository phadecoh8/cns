import { Router } from 'express';
import { rateLimit } from '../../middleware/rate-limit.js';
import {
  loginFounder, logoutFounder 
} from './controller.js';

export const founderRouter = Router();

founderRouter.post(
  '/founder/login',
  rateLimit('founder-login', 8, 60 * 60 * 1000),
  loginFounder,
);
founderRouter.post('/founder/logout', logoutFounder);
