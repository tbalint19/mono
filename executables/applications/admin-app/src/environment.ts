import { z } from 'zod'

const LOGOUT_CONFIG = z.union([
  z.object({
    VITE_OPENID_THIRD_PARTY_MODE: z.literal("true"),
    VITE_LOCAL_LOGOUT_PATH: z.string(),
  }),
  z.object({
    VITE_OPENID_THIRD_PARTY_MODE: z.literal("false"),
    VITE_LOGOUT_URL: z.string(),
    VITE_LOGOUT_REDIRECT_URI: z.string().optional(),
  }),
]).parse(import.meta.env)

const _ENVIRONMENT = z.object({
  VITE_ADMIN_API: z.string(),
  VITE_CLIENT_ID: z.string(),
  
  VITE_AUTH_URL: z.string(),
  VITE_LOGIN_REDIRECT_URI: z.string(),
}).parse(import.meta.env)

const ENVIRONMENT = { ..._ENVIRONMENT, ...LOGOUT_CONFIG }

export default ENVIRONMENT