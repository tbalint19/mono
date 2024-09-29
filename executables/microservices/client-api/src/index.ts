import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { authMiddleware, authRouter } from './middleware/auth'
import { loggerMiddleware } from './middleware/logger'
import { users } from '@domain/models'

const server = express()
server.use(express.json())
server.use(authMiddleware)
server.use(loggerMiddleware)

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