import "dotenv/config"
import "express-async-errors"
import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { authMiddleware, authRouter } from './middleware/auth'
import { loggerMiddleware } from './middleware/logger'
import { http401 } from "@auth/middleware"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())
server.use(authMiddleware)
server.use(loggerMiddleware)

const app = initServer()
const router = app.router(adminContract, {
  createDemo: async ({ req }) => {
    if (!req.user)
      return http401()
    return { status: 200, body: { greeting: "welcome" } }
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