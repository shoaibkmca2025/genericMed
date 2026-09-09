import assert from 'node:assert/strict';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import test from 'node:test';

import { createApp } from './app';
import { createServerConfig } from './config';
import { createLogger } from './logger';

interface HealthResponse {
  environment: string;
  service: string;
  status: string;
  timestamp: string;
}

interface ErrorResponse {
  error: {
    code: string;
  };
}

const createTestServer = async (): Promise<{
  baseUrl: string;
  close: () => Promise<void>;
}> => {
  const config = createServerConfig({ NODE_ENV: 'test' });
  const app = createApp({ config, logger: createLogger(config) });
  const server = app.listen(0);

  await once(server, 'listening');

  const address = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: async (): Promise<void> => {
      await new Promise<void>((resolve, reject): void => {
        server.close((error?: Error): void => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    },
  };
};

test('health endpoint responds with service status and a request ID', async (): Promise<void> => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/api/v1/health`, {
      headers: { 'X-Request-ID': 'health-check-123' },
    });
    const body = (await response.json()) as HealthResponse;

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-request-id'), 'health-check-123');
    assert.equal(body.environment, 'test');
    assert.equal(body.service, 'genericmed-api');
    assert.equal(body.status, 'ok');
    assert.equal(Number.isNaN(Date.parse(body.timestamp)), false);
  } finally {
    await server.close();
  }
});

test('health endpoint rejects untrusted browser origins', async (): Promise<void> => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/api/v1/health`, {
      headers: { Origin: 'https://untrusted.example' },
    });
    const body = (await response.json()) as ErrorResponse;

    assert.equal(response.status, 403);
    assert.equal(body.error.code, 'CORS_ORIGIN_DENIED');
  } finally {
    await server.close();
  }
});

test('health endpoint rejects unsupported query parameters', async (): Promise<void> => {
  const server = await createTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/api/v1/health?verbose=true`);
    const body = (await response.json()) as ErrorResponse;

    assert.equal(response.status, 400);
    assert.equal(body.error.code, 'VALIDATION_ERROR');
  } finally {
    await server.close();
  }
});
