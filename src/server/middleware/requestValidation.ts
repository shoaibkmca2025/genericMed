import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { z } from 'zod';

import { ApiError } from '../errors';

export interface RequestSchemas {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}

interface ValidationTarget {
  body?: unknown;
  params?: unknown;
  query?: unknown;
}

const getValidationIssues = (error: z.ZodError): Record<string, unknown> => ({
  issues: error.issues.map((issue): Record<string, unknown> => ({
    code: issue.code,
    message: issue.message,
    path: issue.path.join('.'),
  })),
});

export const validateRequest = (schemas: RequestSchemas): RequestHandler => {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const validationTarget: ValidationTarget = {
      ...(schemas.body ? { body: request.body } : {}),
      ...(schemas.params ? { params: request.params } : {}),
      ...(schemas.query ? { query: request.query } : {}),
    };
    const validationSchema = z.object({
      ...(schemas.body ? { body: schemas.body } : {}),
      ...(schemas.params ? { params: schemas.params } : {}),
      ...(schemas.query ? { query: schemas.query } : {}),
    });
    const validationResult = validationSchema.safeParse(validationTarget);

    if (!validationResult.success) {
      next(
        new ApiError({
          code: 'VALIDATION_ERROR',
          details: getValidationIssues(validationResult.error),
          message: 'The request did not match the expected format.',
          statusCode: 400,
        }),
      );
      return;
    }

    next();
  };
};
