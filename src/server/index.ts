import 'dotenv/config';

import { createApp } from './app';
import { createServerConfig } from './config';
import { createLogger } from './logger';

const config = createServerConfig();
const logger = createLogger(config);
const app = createApp({ config, logger });
const server = app.listen(config.port, (): void => {
  logger.info(
    { environment: config.environment, port: config.port },
    'genericMed API server is listening',
  );
});

const closeServer = (signal: NodeJS.Signals): void => {
  logger.info({ signal }, 'Shutting down genericMed API server');

  server.close((error?: Error): void => {
    if (error) {
      logger.error({ error, signal }, 'API server did not shut down cleanly');
      process.exitCode = 1;
      return;
    }

    logger.info({ signal }, 'genericMed API server stopped');
  });
};

process.once('SIGINT', (): void => {
  closeServer('SIGINT');
});

process.once('SIGTERM', (): void => {
  closeServer('SIGTERM');
});
