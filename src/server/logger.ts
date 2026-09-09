import pino, { type Logger } from 'pino';

import type { ServerConfig } from './config';

const REDACTED_VALUE = '[REDACTED]';

export const createLogger = (config: ServerConfig): Logger =>
  pino({
    base: {
      environment: config.environment,
      service: 'genericmed-api',
    },
    level: config.environment === 'test' ? 'silent' : config.logLevel,
    redact: {
      censor: REDACTED_VALUE,
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers.set-cookie',
        'password',
        'refreshToken',
      ],
    },
  });
