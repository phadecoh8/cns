import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema): RequestHandler {
  return (request, response, next) => {
    const result = schema.safeParse(request.body);

    if (!result.success) {
      response.status(400).json({error: {
        code: 'INVALID_INPUT',
        message: 'Check the submitted values and try again.',
      },});
      return;
    }

    request.body = result.data;
    next();
  };
}
