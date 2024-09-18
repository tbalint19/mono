import { z } from "zod"

export const UserDataSchema = z.object({
  age: z.number()
})

export type UserData = z.infer<typeof UserDataSchema>