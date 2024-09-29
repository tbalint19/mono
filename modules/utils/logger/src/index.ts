type LogLevel = 'error' | 'info'

type Config = {
  mode: 'combined' | 'local' | 'remote'
  remote: {
    source: string
    apiKey: string
  }
  level: 'none' | 'error' | 'all'
}

type LogMessage = {
  user?: string
  path?: string
  status?: string
  message: string
}

export const createLogger = (config: Config) => {

  const remoteLog = async (level: LogLevel, log: LogMessage) => {
    try {
      await fetch(`https://api.logflare.app/logs/json?source=${config.remote.source}`, {
        headers: {
          'Content-Type': "application/json; charset=utf-8",
          'X-API-KEY': config.remote.apiKey
        },
        body: JSON.stringify({ type: level, ...log })
      })
    } catch (error) {
      console.log(`⛔️ --- LOGGER ERROR --- ⛔️`)
    }
  }

  const log = async (level: LogLevel, log: LogMessage) => {

    if (config.level === 'none')
      return

    if (config.level === 'error' && level === 'info')
      return

    if (config.mode === 'combined' || config.mode === 'local')
      console.log(`${level === 'error' ? '🚨' : '🟢'} --> ${JSON.stringify(log)}`)

    if (config.mode === 'combined' || config.mode === 'remote')
      remoteLog(level, log)
  }

  return log
}
