import { initContract } from "@ts-rest/core";
import { z } from "zod"

const c = initContract()
export const adminContract = c.router({
  ping: {
    method: 'GET',
    path: '/api/ping',
    responses: {
      200: z.object({
        message: z.literal("pong")
      })
    }
  }
})