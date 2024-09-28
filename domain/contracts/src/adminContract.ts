import { initContract } from "@ts-rest/core";
import { z } from "zod"

const c = initContract()
export const adminContract = c.router({
  createDemo: {
    method: 'POST',
    path: '/api/demo',
    body: z.object({
      msg: z.string()
    }),
    responses: {
      200: z.object({
        greeting: z.string()
      })
    }
  }
})