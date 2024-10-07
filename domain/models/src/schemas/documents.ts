import { z } from "zod"

export const UserDataSchema = z.object({
  birthDate: z.string().date().optional(),
  birthPlace: z.object({
    country: z.string().optional(),
    city: z.string().optional(),
  }).optional(),
})

export type UserData = z.infer<typeof UserDataSchema>