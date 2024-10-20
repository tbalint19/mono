import "dotenv/config"
import "express-async-errors"
import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { authMiddleware, authRouter } from './middleware/auth'
import { loggerMiddleware } from './middleware/logger'
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())
server.use(authMiddleware)
server.use(loggerMiddleware)

const app = initServer()
const router = app.router(adminContract, {
  ping: async () => {
    return { status: 200, body: { message: "pong" } }
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