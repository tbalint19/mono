import ENVIRONMENT from "../environment"
import { createAuthMiddleware } from "@auth/middleware"
import { database } from "../database"
import { user } from "@domain/models"
import { eq } from "drizzle-orm"

const { authMiddleware, authRouter } = createAuthMiddleware({
  provider: {
    endpoint: ENVIRONMENT.TOKEN_URL,
    clientId: ENVIRONMENT.CLIENT_ID,
    clientSecret: ENVIRONMENT.CLIENT_SECRET,
    redirectUri: ENVIRONMENT.REDIRECT_URI,
  },
  jwt: {
    secret: ENVIRONMENT.JWT_SECRET,
    expire: ENVIRONMENT.JWT_EXPIRATION,
  }
}, async (idTokenPayload) => {
  const selectResult = await database.select().from(user).where(eq(user.openId, idTokenPayload.sub)).catch()
  if (!selectResult)
    return null
  
  if (selectResult.length) {
    const existingUser = selectResult[0]
    return { id: existingUser.id }
  }

  const insertResult = await database.insert(user).values({ openId: idTokenPayload.sub }).returning().catch()
  if (!insertResult || !insertResult.length)
    return null
  
  const newUser = insertResult[0]
  return { id: newUser.id }
})

export {
  authMiddleware,
  authRouter,
}