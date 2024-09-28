import { Request, Response, NextFunction } from 'express';
import { initServer } from '@ts-rest/express'
import { authContract } from 'auth-contract'

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  request.user = { username: "akarmi" }
  next()
}

const server = initServer()
export const authRouter = server.router(authContract, {
  login: async ({ body, headers, req }) => {
    console.log("login endpoint called")
    return { status: 200, body: { token: "" } }
  }
})

declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string
      }
    }
  }
}