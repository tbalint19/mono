import ENVIRONMENT from "../environment";
import { createLoggerMiddleware } from "@logger/middleware";
import { session } from "./auth";

export const loggerMiddleware = createLoggerMiddleware({
  remote: {
    source: ENVIRONMENT.LOGGER_REMOTE_SOURCE,
    apiKey: ENVIRONMENT.LOGGER_API_KEY,
  },
  level: ENVIRONMENT.LOG_LEVEL,
  mode: ENVIRONMENT.LOGGER_MODE,
}, (request) => session(request)?.id || "anonymus")