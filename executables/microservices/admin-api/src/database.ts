import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js"
import ENVIRONMENT from "./environment";

const host = ENVIRONMENT.DATABASE_HOST
const databaseName = ENVIRONMENT.DATABASE_NAME
const user = ENVIRONMENT.DATABASE_USER
const password = ENVIRONMENT.DATABASE_PASSWORD
const port = ENVIRONMENT.DATABASE_PORT

if (!host || !databaseName || !user || !password)
  throw new Error("No connection string specified")

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${databaseName}`

export const connection = postgres(connectionString, { max: 10, idle_timeout: 10, connect_timeout: 10 })
export const database = drizzle(connection)