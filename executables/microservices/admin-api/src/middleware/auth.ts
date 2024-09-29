import ENVIRONMENT from "../environment"
import { createAuthMiddleware } from "@auth/middleware"

const { authMiddleware, authRouter } = createAuthMiddleware({
  provider: {
    clientId: ENVIRONMENT.CLIENT_ID,
    clientSecret: ENVIRONMENT.CLIENT_SECRET,
    redirectUri: ENVIRONMENT.REDIRECT_URI,
  },
  jwt: {
    secret: ENVIRONMENT.JWT_SECRET,
    expire: ENVIRONMENT.JW_EXPIRATION,
  }
}, async (idTokenPayload) => ({ id: idTokenPayload.sub }))

export {
  authMiddleware,
  authRouter,
}