import { z } from 'zod';

const DEFAULT_PORT = 4000;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT_MAX = 10_000;
const DEFAULT_TRUST_PROXY_HOPS = 0;
const MAX_PORT = 65_535;
const MAX_TRUST_PROXY_HOPS = 10;
const LOCAL_DEVELOPMENT_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
] as const;

const logLevelSchema = z.enum([
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'silent',
]);

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(MAX_PORT).default(DEFAULT_PORT),
    APP_URL: z.string().url().optional(),
    API_RATE_LIMIT_WINDOW_MS: z
      .coerce.number()
      .int()
      .positive()
      .default(DEFAULT_RATE_LIMIT_WINDOW_MS),
    API_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(DEFAULT_RATE_LIMIT_MAX),
    TRUST_PROXY_HOPS: z
      .coerce.number()
      .int()
      .min(0)
      .max(MAX_TRUST_PROXY_HOPS)
      .default(DEFAULT_TRUST_PROXY_HOPS),
    LOG_LEVEL: logLevelSchema.default('info'),
  })
  .superRefine((environment, context): void => {
    if (environment.NODE_ENV === 'production' && !environment.APP_URL) {
      context.addIssue({
        code: 'custom',
        message: 'APP_URL is required when NODE_ENV is production.',
        path: ['APP_URL'],
      });
    }
  });

export type ServerEnvironment = 'development' | 'test' | 'production';
export type ServerLogLevel = z.infer<typeof logLevelSchema>;

export interface ServerConfig {
  appUrl?: string;
  allowedOrigins: readonly string[];
  environment: ServerEnvironment;
  logLevel: ServerLogLevel;
  port: number;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  trustProxyHops: number;
}

const formatEnvironmentIssues = (issues: z.core.$ZodIssue[]): string =>
  issues
    .map((issue): string => `${issue.path.join('.') || 'environment'}: ${issue.message}`)
    .join('; ');

const normaliseOrigin = (url: string): string => new URL(url).origin;

const getAllowedOrigins = (environment: ServerEnvironment, appUrl?: string): readonly string[] => {
  const origins = new Set<string>();

  if (environment !== 'production') {
    LOCAL_DEVELOPMENT_ORIGINS.forEach((origin): void => {
      origins.add(origin);
    });
  }

  if (appUrl) {
    origins.add(normaliseOrigin(appUrl));
  }

  return [...origins];
};

export const createServerConfig = (
  environmentVariables: NodeJS.ProcessEnv = process.env,
): ServerConfig => {
  const parsedEnvironment = environmentSchema.safeParse(environmentVariables);

  if (!parsedEnvironment.success) {
    throw new Error(`Invalid server environment: ${formatEnvironmentIssues(parsedEnvironment.error.issues)}`);
  }

  const environment = parsedEnvironment.data;

  return {
    appUrl: environment.APP_URL,
    allowedOrigins: getAllowedOrigins(environment.NODE_ENV, environment.APP_URL),
    environment: environment.NODE_ENV,
    logLevel: environment.LOG_LEVEL,
    port: environment.PORT,
    rateLimitMax: environment.API_RATE_LIMIT_MAX,
    rateLimitWindowMs: environment.API_RATE_LIMIT_WINDOW_MS,
    trustProxyHops: environment.TRUST_PROXY_HOPS,
  };
};
