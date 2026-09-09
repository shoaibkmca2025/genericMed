import type { Request, Response } from 'express';
import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';

import type { ServerConfig } from '../config';

const RATE_LIMIT_STATUS_CODE = 429;

export const createPublicRateLimiter = (config: ServerConfig): RateLimitRequestHandler =>
  rateLimit({
    legacyHeaders: false,
    limit: config.rateLimitMax,
    standardHeaders: 'draft-8',
    windowMs: config.rateLimitWindowMs,
    handler: (request: Request, response: Response): void => {
      request.log.warn({ path: request.originalUrl }, 'Rate limit exceeded');
      response.status(RATE_LIMIT_STATUS_CODE).json({
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again later.',
        },
      });
    },
  });
