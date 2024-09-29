import ENVIRONMENT from "../environment";
import { createLoggerMiddleware } from "@logger/middleware";

export const loggerMiddleware = createLoggerMiddleware({
  remote: {
    source: ENVIRONMENT.LOGGER_REMOTE_SOURCE,
    apiKey: ENVIRONMENT.LOGGER_API_KEY,
  },
  level: ENVIRONMENT.LOG_LEVEL,
  mode: ENVIRONMENT.LOGGER_MODE,
}, (request) => request.user?.id || "anonymus")