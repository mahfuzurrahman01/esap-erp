import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: z.string().min(1),
    // NEXTAUTH_URL is auto-set by Vercel, so make it optional
    NEXTAUTH_URL: z.string().url().optional(),
    NEXT_PUBLIC_REST_API_ENDPOINT: z.string().url(),
    // Optional email config
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_FROM_EMAIL: z.string().email().optional(),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().optional(),
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: z.string().optional(),
  },
  runtimeEnv: process.env,
  // Skip validation during build on Vercel (env vars may not be available)
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

