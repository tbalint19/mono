import { z } from "zod"
import { jwtDecode } from "jwt-decode";
import { getContext, setContext } from "svelte"
import ENVIRONMENT from "../environment";

export type LogoutConfig = 
  | { thirdPartyMode: "true", localLogoutPath: string }
  | { thirdPartyMode: "false", logoutUrl: string, postLogoutUrl?: string }

export type Config = {
  authUrl: string
  clientId: string
  redirectUri: string
} & LogoutConfig

const userStoreFactory = <UserSchema extends z.ZodTypeAny>(schema: UserSchema, config: Config) => {

  class UserStore {

    private _data = $state<z.infer<typeof schema> | null>(null)
    private _token = $state<string | null>(null)
  
    constructor() {
      this._data = null
      this._token = null
    }
  
    get data() {
      return this._data
    }

    get token() {
      return this._token
    }
  
    auth() {
      const authUrl = new URL(config.authUrl)
      authUrl.searchParams.set('client_id', config.clientId)
      authUrl.searchParams.set('redirect_uri', config.redirectUri)
      authUrl.searchParams.set('response_type', 'code')
      authUrl.searchParams.set('scope', 'openid email profile')
      if (config.thirdPartyMode)
        authUrl.searchParams.set('consent', 'prompt')
      if (!window || !window.location || !window.location.href)
        throw new Error("")
      window.location.href = authUrl.toString()
    }
  
    logout() {
      if (config.thirdPartyMode === "true") {
        window.location.href = config.localLogoutPath
        return
      }
      const logoutUrl = new URL(config.logoutUrl)
      logoutUrl.searchParams.set('client_id', config.clientId)
      if (config.postLogoutUrl)
        logoutUrl.searchParams.set('post_logout_redirect_uri', config.postLogoutUrl)
      if (!window || !window.location || !window.location.href)
        throw new Error("")
      window.location.href = logoutUrl.toString()
    }
  
    set(token: string | undefined) {
      if (!token) {
        this._token = null
        this._data = null
        return
      }
      try {
        const payload = jwtDecode(token)
        const result = UserSchema.parse(payload)
        const expResult = z.object({ exp: z.number({ coerce: true }).optional() }).safeParse(payload)
        if (expResult.success && expResult.data.exp) {
          const expMillis = expResult.data.exp
          const nowMillis = new Date().getMilliseconds()
          if (+expMillis < nowMillis)
            throw new Error("JWT expired")
        }
        this._data = result
        this._token = token
      } catch (error) {
        this._data = null
        this._token = null
      }
    }
  }
  
  const USER_CONTEXT_KEY = Symbol('USER')
  const initUserStore = () => setContext(USER_CONTEXT_KEY, new UserStore())
  const getUserStore = () => getContext<ReturnType<typeof initUserStore>>(USER_CONTEXT_KEY)

  return {
    initUserStore,
    getUserStore,
  }
}

const UserSchema = z.object({
  id: z.string()
})

const config: Config = ENVIRONMENT.VITE_OPENID_THIRD_PARTY_MODE === "true" ? {
  thirdPartyMode: ENVIRONMENT.VITE_OPENID_THIRD_PARTY_MODE,
  authUrl: ENVIRONMENT.VITE_AUTH_URL,
  clientId: ENVIRONMENT.VITE_CLIENT_ID,
  redirectUri: ENVIRONMENT.VITE_LOGIN_REDIRECT_URI,
  localLogoutPath: ENVIRONMENT.VITE_LOCAL_LOGOUT_PATH,
} : {
  thirdPartyMode: ENVIRONMENT.VITE_OPENID_THIRD_PARTY_MODE,
  authUrl: ENVIRONMENT.VITE_AUTH_URL,
  clientId: ENVIRONMENT.VITE_CLIENT_ID,
  redirectUri: ENVIRONMENT.VITE_LOGIN_REDIRECT_URI,
  logoutUrl: ENVIRONMENT.VITE_LOGOUT_URL,
  postLogoutUrl: ENVIRONMENT.VITE_LOGOUT_REDIRECT_URI,
}

export const {
  initUserStore,
  getUserStore,
} = userStoreFactory(UserSchema, config)