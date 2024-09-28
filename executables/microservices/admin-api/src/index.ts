import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { createAuthMiddleware } from '@auth/middleware'
import { users } from '@domain/models'

const server = express()
server.use(express.json())

const { authMiddleware, authRouter } = createAuthMiddleware({
  provider: { clientId: "", clientSecret: "", redirectUri: "" },
  jwt: { secret: "", expire: "" }
}, async (idTokenPayload) => ({ id: "" }))

server.use(authMiddleware)

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