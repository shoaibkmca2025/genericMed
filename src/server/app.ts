import { randomUUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

import cors, { type CorsOptions } from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import pinoHttp, { type ReqId } from 'pino-http';
import type { Logger } from 'pino';

import type { ServerConfig } from './config';
import { ApiError } from './errors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { createPublicRateLimiter } from './middleware/rateLimit';
import { createApiRouter } from './routes';

const JSON_BODY_LIMIT = '1mb';
const REQUEST_ID_HEADER = 'x-request-id';
const MAX_REQUEST_ID_LENGTH = 128;
const VALID_REQUEST_ID_PATTERN = /^[a-zA-Z0-9-]+$/;

export interface CreateAppOptions {
  config: ServerConfig;
  logger: Logger;
}

const getRequestId = (request: IncomingMessage, response: ServerResponse): ReqId => {
  const suppliedRequestId = request.headers[REQUEST_ID_HEADER];
  const requestId =
    typeof suppliedRequestId === 'string' &&
    suppliedRequestId.length <= MAX_REQUEST_ID_LENGTH &&
    VALID_REQUEST_ID_PATTERN.test(suppliedRequestId)
      ? suppliedRequestId
      : randomUUID();

  response.setHeader(REQUEST_ID_HEADER, requestId);

  return requestId;
};

const createCorsOptions = (config: ServerConfig): CorsOptions => ({
  allowedHeaders: ['Authorization', 'Content-Type', 'X-Request-ID'],
  credentials: true,
  exposedHeaders: ['RateLimit', 'RateLimit-Policy', 'X-Request-ID'],
  maxAge: 86_400,
  methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
  optionsSuccessStatus: 204,
  origin: (origin, callback): void => {
    if (!origin || config.allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(
      new ApiError({
        code: 'CORS_ORIGIN_DENIED',
        message: 'This origin is not allowed to access the API.',
        statusCode: 403,
      }),
    );
  },
});

export const createApp = ({ config, logger }: CreateAppOptions): Express => {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxyHops);
  app.use(
    pinoHttp({
      customLogLevel: (_request, response, error): 'error' | 'info' | 'warn' => {
        if (error || response.statusCode >= 500) {
          return 'error';
        }

        return response.statusCode >= 400 ? 'warn' : 'info';
      },
      genReqId: getRequestId,
      logger,
    }),
  );
  app.use(helmet());
  app.use(cors(createCorsOptions(config)));
  app.use(createPublicRateLimiter(config));
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: JSON_BODY_LIMIT }));
  app.use('/api/v1', createApiRouter(config));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
