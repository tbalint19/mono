import ENVIRONMENT from './environment'
import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { createAuthMiddleware } from '@auth/middleware'
import { createLoggerMiddleware } from '@logger/middleware'
import { users } from '@domain/models'

const server = express()
server.use(express.json())

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

server.use(authMiddleware)

server.use(createLoggerMiddleware({
  remote: {
    source: ENVIRONMENT.LOGGER_REMOTE_SOURCE,
    apiKey: ENVIRONMENT.LOGGER_API_KEY,
  },
  level: ENVIRONMENT.LOG_LEVEL,
  mode: ENVIRONMENT.LOGGER_MODE,
}, (request) => request.user?.id || "anonymus"))

const app = initServer()
const router = app.router(adminContract, {
  createDemo: async ({ body, headers, req }) => {
    console.log(req.user)
    return { status: 200, body: { greeting: "" } }
  }
})

createExpressEndpoints({
  ...authContract,
  ...adminContract,
}, {
  ...authRouter,
  ...router,
}, server)

server.listen(3000, () => console.log("STARTED"))