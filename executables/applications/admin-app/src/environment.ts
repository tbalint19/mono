import { z } from 'zod'

const ENVIRONMENT = z.object({
  VITE_ADMIN_API: z.string(),

  VITE_TOKEN_URL: z.string(),
  VITE_CLIENT_ID: z.string(),
  VITE_REDIRECT_URI: z.string(),
}).parse(import.meta.env)

export default ENVIRONMENT