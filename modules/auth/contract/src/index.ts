import { initContract } from "@ts-rest/core";
import { z } from "zod"

const c = initContract()
export const authContract = c.router({
  login: {
    method: 'POST',
    path: '/api/login',
    body: z.object({
      code: z.string()
    }),
    responses: {
      200: z.object({
        token: z.string()
      })
    }
  }
})