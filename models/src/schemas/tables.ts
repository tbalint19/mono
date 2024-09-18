import { json, pgTable, text, uuid } from "drizzle-orm/pg-core";
import type { UserData } from "./documents";

export const users = pgTable("APP_USERS", {
  id: uuid("ID").primaryKey().defaultRandom(),
  username: text("USERNAME"),
  data: json("DATA").$type<UserData>()
})