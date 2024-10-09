import { Request, Response, NextFunction } from 'express';
import { initServer } from '@ts-rest/express'
import { authContract } from '@auth/contract'
import { z } from 'zod'
import { getIdToken } from './api';
import { jwt } from '@utils/jwt'
import { ProviderConfig } from './api';

type Config = {
  provider: ProviderConfig
  jwt: {
    secret: string
    expire: string
  }
}

const IdTokenPayloadSchema = z.object({
  sub: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
})
type IdTokenPayload = z.infer<typeof IdTokenPayloadSchema>

const SessionSchema = z.object({
  id: z.string(),
  permissions: z.unknown().optional(),
})
type Session = z.infer<typeof SessionSchema>

export const createAuthMiddleware = (config: Config, domainLogin: (idTokenPayload: IdTokenPayload) => Promise<Session | null>) => {
  const server = initServer()
  const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers['authorization']
    if (!authToken)
      return next()

    const sessionUser = await jwt(SessionSchema)
      .configure({ secret: config.jwt.secret, expiresIn: config.jwt.expire })
      .verify(authToken)

    if (!sessionUser)
      return next()

    request.user = sessionUser
    next()
  }
  
  const authRouter = server.router(authContract, {
    login: async ({ body }) => {
      const idTokenPayload = await getIdToken(config.provider, body.code)
      if (!idTokenPayload)
        return { status: 401, body }
      const session = await domainLogin(idTokenPayload)
      if (!session)
        return { status: 403, body }
      const token = await jwt(SessionSchema)
        .configure({ secret: config.jwt.secret, expiresIn: config.jwt.expire })
        .sign(session)
      if (!token)
        return { status: 500, body }
      return { status: 200, body: { token } }
    }
  })

  return {
    authMiddleware,
    authRouter,
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Session
    }
  }
}
