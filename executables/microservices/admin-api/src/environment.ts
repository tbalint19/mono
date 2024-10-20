import { z } from 'zod'

const ENVIRONMENT = z.object({
  TOKEN_URL: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  
  LOG_LEVEL: z.union([ z.literal("none"), z.literal("error"), z.literal("all") ]),
  LOGGER_MODE: z.union([ z.literal("local"), z.literal("remote"), z.literal("combined") ]),
  LOGGER_REMOTE_SOURCE: z.string().optional(),
  LOGGER_API_KEY: z.string().optional(),

  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.number({ coerce: true }).optional(),
}).parse(process.env)

export default ENVIRONMENT