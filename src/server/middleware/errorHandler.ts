import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors';

interface ErrorResponse {
  error: {
    code: string;
    details?: Record<string, unknown>;
    message: string;
    requestId?: string;
  };
}

const INTERNAL_SERVER_ERROR = new ApiError({
  code: 'INTERNAL_SERVER_ERROR',
  message: 'An unexpected error occurred.',
  statusCode: 500,
});

const getRequestId = (response: Response): string | undefined => {
  const requestId = response.getHeader('x-request-id');

  return typeof requestId === 'string' ? requestId : undefined;
};

const getErrorResponse = (error: ApiError, requestId?: string): ErrorResponse => ({
  error: {
    code: error.code,
    ...(error.details ? { details: error.details } : {}),
    message: error.message,
    ...(requestId ? { requestId } : {}),
  },
});

export const errorHandler = (
  error: unknown,
  request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  const apiError = error instanceof ApiError ? error : INTERNAL_SERVER_ERROR;
  const requestId = getRequestId(response);
  const isServerError = apiError.statusCode >= 500;

  if (isServerError) {
    request.log.error({ error, requestId }, 'Unhandled request error');
  } else {
    request.log.warn(
      { code: apiError.code, requestId, statusCode: apiError.statusCode },
      'Request rejected',
    );
  }

  response.status(apiError.statusCode).json(getErrorResponse(apiError, requestId));
};

export const notFoundHandler = (request: Request, response: Response): void => {
  const requestId = getRequestId(response);

  response.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `No API route matches ${request.method} ${request.originalUrl}.`,
      ...(requestId ? { requestId } : {}),
    },
  });
};
