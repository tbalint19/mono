import { initClient } from "@ts-rest/core";
import * as contracts from '@domain/contracts'
import * as contract from "@auth/contract";
import ENVIRONMENT from "../../environment";

const { adminContract } = contracts
const { authContract } = contract

const createClient = (getToken: () => string) => {
  const client = initClient({
    ...adminContract,
    ...authContract,
  }, {
    baseUrl: ENVIRONMENT.VITE_ADMIN_API,
    baseHeaders: {
      'authorization': getToken
    }
  })
  return client
}
export const client = createClient(() => {
  if (!window || !window.localStorage)
    throw new Error("Client supposed to be initialized in the browser")
  return window.localStorage.getItem('token') || ""
})

export const backChannel = createClient(() => "")

export type Client = ReturnType<typeof createClient>