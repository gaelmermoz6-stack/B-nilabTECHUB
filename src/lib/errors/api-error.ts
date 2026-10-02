export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Record<string, unknown>;

  constructor({
    message,
    statusCode = 500,
    code = "INTERNAL_ERROR",
    details,
  }: {
    message: string;
    statusCode?: number;
    code?: string;
    details?: Record<string, unknown>;
  }) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function createErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return {
      ok: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? null,
      },
    };
  }

  return {
    ok: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Une erreur interne est survenue.",
      details: null,
    },
  };
}
