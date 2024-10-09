import { initClient } from "@ts-rest/core";
import * as contracts from '@domain/contracts'
import * as contract from "@auth/contract";
import ENVIRONMENT from "../../environment";

const { adminContract } = contracts
const { authContract } = contract

export const client = initClient({
  ...adminContract,
  ...authContract,
}, {
  baseUrl: ENVIRONMENT.VITE_ADMIN_API,
  baseHeaders: {
    'authorization': () => localStorage.getItem('') || ''
  }
})