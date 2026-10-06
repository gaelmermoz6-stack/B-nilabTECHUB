import { z } from "zod";

const readEnv = (key: string) => process.env[key] ?? process.env[`AFRILAUNCH_${key}`] ?? undefined;

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).default("postgresql://postgres:postgres@localhost:5432/africlaunch_dev?schema=public"),
  NEXTAUTH_URL: z.string().url().optional().or(z.literal("")),
  NEXTAUTH_SECRET: z.string().min(1).default("development-secret-change-me"),
  AUTH_SECRET: z.string().min(1).default("development-secret-change-me"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: readEnv("NODE_ENV") ?? "development",
  DATABASE_URL: readEnv("DATABASE_URL") ?? "postgresql://postgres:postgres@localhost:5432/africlaunch_dev?schema=public",
  NEXTAUTH_URL: readEnv("NEXTAUTH_URL") ?? "",
  NEXTAUTH_SECRET: readEnv("NEXTAUTH_SECRET") ?? "development-secret-change-me",
  AUTH_SECRET: readEnv("AUTH_SECRET") ?? "development-secret-change-me",
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: readEnv("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
  CLERK_SECRET_KEY: readEnv("CLERK_SECRET_KEY"),
});

export function getAppUrl(): string {
  return env.NEXTAUTH_URL || "http://localhost:3000";
}
