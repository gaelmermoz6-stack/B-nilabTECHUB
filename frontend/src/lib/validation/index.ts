import { z, ZodSchema } from "zod";

export function validateData<T>(schema: ZodSchema<T>, data: unknown) {
  return schema.safeParse(data);
}

export function parseBody<T>(schema: ZodSchema<T>, body: unknown) {
  const result = schema.safeParse(body);

  if (!result.success) {
    throw new Error(result.error.issues.map((issue) => issue.message).join(", "));
  }

  return result.data;
}

export const pageQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
