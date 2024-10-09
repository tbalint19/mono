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
  name: z.string(),
  email: z.string(),
})
export type IdTokenPayload = z.infer<typeof IdTokenPayloadSchema>

const { decode } = jwt(IdTokenPayloadSchema)

export const getIdToken = async (config: ProviderConfig, code: string) => {
  const url = config.endpoint
  const response = await safeFetch(ProviderResponseSchema, url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      scope: 'openid email profile',
      grant_type: 'authorization_code',
    })
  })
  if (!response.success)
    return null

  const idTokenPayload = decode(response.data.id_token)
  return idTokenPayload
}