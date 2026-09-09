import { Router } from 'express';

import type { ServerConfig } from '../config';
import { createHealthRouter } from './health';

export const createApiRouter = (config: ServerConfig): Router => {
  const router = Router();

  router.use(createHealthRouter(config));

  return router;
};
