import { Request, Response, NextFunction } from 'express';
import { initServer } from '@ts-rest/express'
import { authContract } from '@auth/contract'
import { z } from 'zod'
import { getIdToken } from './api';
import { jwt } from '@utils/jwt'
import { ProviderConfig } from './api';
import { IdTokenPayload } from './api';

type Config = {
  provider: ProviderConfig
  jwt: {
    secret: string
    expire: string
  }
}

export const createAuthMiddleware = <SessionSchemaType extends z.ZodTypeAny>(
  config: Config, SessionSchema: SessionSchemaType, domainLogin: (idTokenPayload: IdTokenPayload) => Promise<z.infer<typeof SessionSchema> | null>) => {
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

  const session = (req: Request): z.infer<typeof SessionSchema> | null => {
    if (!req.user)
      return null
    const result = SessionSchema.safeParse(req.user)
    if (!result.success)
      return null
    return result.data
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
    session,
    authRouter,
  }
}

export const http401 = () => ({ status: 401, body: null } as const)
export const http403 = () => ({ status: 403, body: null } as const)

declare global {
  namespace Express {
    interface Request {
      user?: unknown
    }
  }
}
