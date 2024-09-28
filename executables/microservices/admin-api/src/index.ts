import { createExpressEndpoints, initServer } from '@ts-rest/express'
import express from 'express'
import { adminContract } from '@domain/contracts'
import { authContract } from '@auth/contract'
import { authMiddleware, authRouter } from '@auth/middleware'
import { users } from '@domain/models'

const app = express()
app.use(express.json())
app.use(authMiddleware)

const server = initServer()
const router = server.router(adminContract, {
  createDemo: async ({ body, headers, req }) => {
    console.log(req.user)
    return { status: 200, body: { greeting: "" } }
  }
})

createExpressEndpoints({...authContract, ...adminContract}, {...router, ...authRouter}, app)

app.listen(3000, () => console.log("STARTED"))