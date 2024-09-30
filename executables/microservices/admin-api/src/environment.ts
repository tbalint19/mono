import { z } from 'zod'

const ENVIRONMENT = z.object({
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),

  JWT_SECRET: z.string(),
  JW_EXPIRATION: z.string(),
  
  LOG_LEVEL: z.union([ z.literal("none"), z.literal("error"), z.literal("all") ]),
  LOGGER_MODE: z.union([ z.literal("local"), z.literal("remote"), z.literal("combined") ]),
  LOGGER_REMOTE_SOURCE: z.string(),
  LOGGER_API_KEY: z.string(),
}).parse(process.env)

export default ENVIRONMENT