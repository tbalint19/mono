import { z } from 'zod'

const ENVIRONMENT = z.object({
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),
  JWT_SECRET: z.string(),
  JW_EXPIRATION: z.string(),
}).parse(process.env)

export default ENVIRONMENT