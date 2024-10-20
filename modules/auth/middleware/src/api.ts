import { jwt } from '@utils/jwt'
import { safeFetch } from '@utils/safe-fetch'
import { z } from 'zod'

export type ProviderConfig = {
  endpoint: string
  clientId: string
  clientSecret: string
  redirectUri: string
}

const ProviderResponseSchema = z.object({
  id_token: z.string()
})

const IdTokenPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().optional(),
  preferred_username: z.string().optional(),
})
export type IdTokenPayload = z.infer<typeof IdTokenPayloadSchema>

const { decode } = jwt(IdTokenPayloadSchema)

export const getIdToken = async (config: ProviderConfig, code: string) => {
  const url = config.endpoint

  const params = new URLSearchParams()
  params.append('code', code)
  params.append('client_id', config.clientId)
  params.append('client_secret', config.clientSecret)
  params.append('redirect_uri', config.redirectUri)
  params.append('grant_type', 'authorization_code')
  params.append('scope', 'openid email profile')

  const response = await safeFetch(ProviderResponseSchema, url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
  if (!response.success)
    return null

  const idTokenPayload = decode(response.data.id_token)
  return idTokenPayload
}