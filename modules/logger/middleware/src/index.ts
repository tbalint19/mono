import type { Request, Response, NextFunction } from "express";
import { createLogger } from "@logger/log"
import type { Config } from "@logger/log"

export const createLoggerMiddleware = (config: Config, getSessionUser: (request: Request) => string) => {
  const log = createLogger(config)

  const middleware = (request: Request, response: Response, next: NextFunction) => {
    const requestId = Math.random().toString().slice(-6)
    const user = getSessionUser(request)
    const requestTime = new Date()
    log("info", {
      message: `Request#${requestId}@${requestTime.toISOString()}`,
      path: request.url,
      user,
    })
    response.on('finish', () => {
      const responseTime = new Date()
      const timeElapsed = responseTime.getMilliseconds() - requestTime.getMilliseconds()
      log("info", {
        message: `Response#${requestId}@${responseTime.toISOString()} (${timeElapsed}ms)`,
        path: request.url,
        user,
        status: `${response.statusCode}`
      })
    })
    response.on('error', () => {
      const errorTime = new Date()
      const timeElapsed = errorTime.getMilliseconds() - requestTime.getMilliseconds()
      log("error", {
        message: `Error#${requestId}@${errorTime.toISOString()} (${timeElapsed}ms)`,
        path: request.url,
        user,
        status: `${response.statusCode}`
      })
    })
    next()
  }

  return middleware
}