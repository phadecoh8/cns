import type {
  Request, Response, NextFunction 
} from 'express';
import { AppError } from '../../utils/errors.js';
import {
  createWaitlistEntrySchema, waitlistQuerySchema 
} from './schema.js';
import {
  createEntry, listEntries 
} from './service.js';

export async function registerForWaitlist(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const input = createWaitlistEntrySchema.safeParse(request.body);

    if (!input.success) {
      throw new AppError(400, 'INVALID_INPUT', 'Check the form and try again.');
    }

    if (input.data.website) {
      throw new AppError(400, 'INVALID_INPUT', 'Check the form and try again.');
    }

    const elapsed = Date.now() - input.data.startedAt;

    if (elapsed < 3000 || elapsed > 60 * 60 * 1000) {
      throw new AppError(400, 'INVALID_INPUT', 'Check the form and try again.');
    }

    const result = await createEntry(input.data);
    response.status(200).json({
      status: result,
      message: result === 'created'
        ? 'You are on the list.'
        : 'This email is already registered.',
    });
  } catch (error) {
    next(error);
  }
}

export async function getWaitlistEntries(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const query = waitlistQuerySchema.safeParse(request.query);

    if (!query.success) {
      throw new AppError(400, 'INVALID_QUERY', 'Check the search filters.');
    }

    response.json(await listEntries(query.data));
  } catch (error) {
    next(error);
  }
}
