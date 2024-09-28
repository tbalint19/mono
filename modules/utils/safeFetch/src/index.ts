import { z } from 'zod'

type Params = Parameters<typeof fetch>

type Response<Data> = {
  status: number
  data: Data
  success: true
} | {
  status: number | null
  error: unknown
  success: false
}

/**
 * 
 * @param params - regular fetch params and a schema
 * 
 * @returns a validated and parsed JSON
 */
export const safeFetch = async <Schema extends z.ZodTypeAny>(
  schema: Schema, ...params: Params
): Promise<Response<z.infer<typeof schema>>> => {
  try {
    const response = await fetch(...params)
    if (response.status > 299)
      return { status: response.status, error: "UNSUCCESSFUL REQUEST", success: false }

    const rawData = await response.json()
    const result = schema.safeParse(rawData)
    if (!result.success)
      return { status: response.status, error: result.error.issues, success: false }

    return { status: response.status, data: result.data, success: true }
  } catch (error) {
    return { status: null, error: "NETWORK ERROR", success: false }
  }
}