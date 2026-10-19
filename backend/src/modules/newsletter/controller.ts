import type {
  Request, Response, NextFunction 
} from 'express';
import { AppError } from '../../utils/errors.js';
import {
  newsletterSchema, tokenSchema 
} from './schema.js';
import {
  confirmSubscription, subscribe, unsubscribe 
} from './service.js';

export async function registerNewsletter(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const input = newsletterSchema.safeParse(request.body);

    if (!input.success) {
      throw new AppError(400, 'INVALID_INPUT', 'Enter a valid email address.');
    }

    const result = await subscribe(input.data.email);

    if (result === 'email_unavailable') {
      throw new AppError(
        503,
        'EMAIL_UNAVAILABLE',
        'Subscriptions are unavailable.',
      );
    }

    response.status(200).json({ status: result });
  } catch (error) {
    next(error);
  }
}

export async function confirmNewsletter(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const input = tokenSchema.safeParse(request.query);

    if (!input.success || !(await confirmSubscription(input.data.token))) {
      throw new AppError(
        400,
        'INVALID_TOKEN',
        'This confirmation link is not valid.',
      );
    }

    response.json({ status: 'confirmed' });
  } catch (error) {
    next(error);
  }
}

export async function unsubscribeNewsletter(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const input = tokenSchema.safeParse(request.query);

    if (!input.success || !(await unsubscribe(input.data.token))) {
      throw new AppError(
        400,
        'INVALID_TOKEN',
        'This unsubscribe link is not valid.',
      );
    }

    response.json({ status: 'unsubscribed' });
  } catch (error) {
    next(error);
  }
}
