import { initClient } from "@ts-rest/core";
import * as contracts from '@domain/contracts'
import * as contract from "@auth/contract";

const { adminContract } = contracts
const { authContract } = contract

export const client = initClient({
  ...adminContract,
  ...authContract,
}, {
  baseUrl: "",
  baseHeaders: {
    'authorization': () => localStorage.getItem('') || ''
  }
})