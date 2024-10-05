import 'dotenv/config'
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js"
import { migrationClient } from "./client";

const database = drizzle(migrationClient);

const run = async () => {
  try {
    await migrate(database, { migrationsFolder: "sql" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  } finally {
    await migrationClient.end()
    console.log("Connection closed")
  }
}

run()

