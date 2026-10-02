import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/africlaunch_dev?schema=public"),
  NEXTAUTH_URL: z.string().url().optional().or(z.literal("")),
  NEXTAUTH_SECRET: z.string().min(1).default("development-secret-change-me"),
  AUTH_SECRET: z.string().min(1).default("development-secret-change-me"),
});

export const env = envSchema.parse(process.env);

export function getAppUrl(): string {
  return env.NEXTAUTH_URL || "http://localhost:3000";
}
