import type { RequestHandler } from 'express';

export const securityHeaders: RequestHandler = (_request, response, next) => {
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
  ].join(', ');
  const contentSecurityPolicy = [
    'default-src \'none\'',
    'frame-ancestors \'none\'',
  ].join('; ');

  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', permissionsPolicy);
  response.setHeader('Content-Security-Policy', contentSecurityPolicy);
  next();
};
