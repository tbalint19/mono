import { verify, sign, decode } from "jsonwebtoken"
import { z } from 'zod'

export const jwt = <const Schema extends z.ZodTypeAny>(schema: Schema) => {

  let secret = ""
  let config = { expiresIn: "" }

  const safeVerify = (token: string) =>
    new Promise<z.infer<typeof schema> | null>((resolve, reject) => verify(token, secret, (error, payload) => {
      if (error) {
        return resolve(null)
      }
      const result = schema.safeParse(payload)
      if (!result.success)
        return resolve(null)
      return resolve(result.data)
    }))
  
  const safeSign = (payload: z.infer<typeof schema>) =>
    new Promise((resolve: (token: string | null) => void, reject) =>
      sign(payload, secret, config, (error, token) => {
        if (error)
          return resolve(null)
        if (!token)
          return resolve(null)
        resolve(token)
      }))

  const safeDecode = (token: string): z.infer<typeof schema> | null => {
    const payload = decode(token) as unknown
    const result = schema.safeParse(payload)
    if (!result.success)
      return null
    return result.data
  }

  const configure = (options: { secret: string, expiresIn: string }) => {
    secret = options.secret
    config = { expiresIn: config.expiresIn }
    return {
      sign: safeSign,
      verify: safeVerify,
    }
  }

  return {
    configure,
    sign: safeSign,
    verify: safeVerify,
    decode: safeDecode,
  }
}