import postgres from "postgres";

const host = process.env.DATABASE_HOST
const database = process.env.DATABASE_NAME
const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT

if (!host || !database || !user || !password)
  throw new Error("No connection string specified")

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`

export const migrationClient = postgres(connectionString, { max: 1 })