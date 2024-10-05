import postgres from "postgres";

const host = process.env.NODE_ENV === "test" ?
  process.env.TEST_DATABASE_HOST :
  process.env.DATABASE_HOST
const database = process.env.NODE_ENV === "test" ?
  process.env.TEST_DATABASE_NAME :
  process.env.DATABASE_NAME
const user = process.env.NODE_ENV === "test" ?
  process.env.TEST_DATABASE_USER :
  process.env.DATABASE_USER
const password = process.env.NODE_ENV === "test" ?
  process.env.TEST_DATABASE_PASSWORD :
  process.env.DATABASE_PASSWORD
const port = process.env.NODE_ENV === "test" ?
  process.env.TEST_DATABASE_PORT :
  process.env.DATABASE_PORT

if (!host || !database || !user || !password)
  throw new Error("No connection string specified")

const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`

export const migrationClient = postgres(connectionString, { max: 1 })