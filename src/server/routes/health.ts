import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

import type { ServerConfig } from '../config';
import { validateRequest } from '../middleware/requestValidation';

interface HealthResponse {
  environment: ServerConfig['environment'];
  service: string;
  status: 'ok';
  timestamp: string;
}

const SERVICE_NAME = 'genericmed-api';
const healthQuerySchema = z.object({}).strict();

export const createHealthRouter = (config: ServerConfig): Router => {
  const router = Router();

  router.get(
    '/health',
    validateRequest({ query: healthQuerySchema }),
    (_request: Request, response: Response<HealthResponse>): void => {
      response.status(200).json({
        environment: config.environment,
        service: SERVICE_NAME,
        status: 'ok',
        timestamp: new Date().toISOString(),
      });
    },
  );

  return router;
};
