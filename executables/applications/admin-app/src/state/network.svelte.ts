import { onMount, onDestroy, setContext, getContext } from "svelte"
import { client } from "$lib/api"

type ConnectionState = 'offline' | 'connecting' | 'online'

const networkStoreFactory = (ping: () => Promise<boolean>) => {

  class NetworkState {
  
    private _interval: null | ReturnType<typeof setInterval> = null
    private _unsuccessfulPingCount = $state(0) 
    private _state = $state<ConnectionState>('connecting')
  
    get state() {
      return this._state
    }
  
    constructor() {
      onMount(() => {
        this._interval = setInterval(async () => {
          const reached = await ping()
          if (!reached)
            this._unsuccessfulPingCount += 1
          if (reached)
            this._unsuccessfulPingCount = 0
          this._state = reached ? 'online' : this._unsuccessfulPingCount <=3 ? 'connecting' : 'offline'
        }, 2000)
      })
      onDestroy(() => {
        if (this._interval) clearInterval(this._interval)
      })
    }
  }
  
  const NETWORK_CONTEXT_KEY = Symbol('NETWORK')
  const initNetworkStore = () => setContext(NETWORK_CONTEXT_KEY, new NetworkState())
  const getNetworkStore = () => getContext<ReturnType<typeof initNetworkStore>>(NETWORK_CONTEXT_KEY)

  return {
    initNetworkStore,
    getNetworkStore,
  }
}

const ping = async () => {
  const response = await client.ping().catch(() => {})
  const reached = response ? response.status === 200 : false
  return reached
}

export const {
  initNetworkStore,
  getNetworkStore,
} = networkStoreFactory(ping)
