export interface ApiErrorOptions {
  code: string;
  details?: Record<string, unknown>;
  message: string;
  statusCode: number;
}

export class ApiError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly statusCode: number;

  public constructor({ code, details, message, statusCode }: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
