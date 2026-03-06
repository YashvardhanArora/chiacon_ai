import { z } from "zod";
import { insertUseCaseSchema, type GeneratedUseCase } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  useCases: {
    generate: {
      method: "POST" as const,
      path: "/api/generate-use-case" as const,
      input: insertUseCaseSchema,
      responses: {
        200: z.custom<GeneratedUseCase>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type GenerateUseCaseInput = z.infer<typeof api.useCases.generate.input>;
export type GeneratedUseCaseResponse = GeneratedUseCase;
