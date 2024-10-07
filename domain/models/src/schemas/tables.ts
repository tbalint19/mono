import { json, pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import type { UserData } from "./documents";

const defaultColumns = {
  id: uuid("ID").primaryKey().defaultRandom(),
  createdAt: timestamp("CREATED_AT").defaultNow(),
  updatedAt: timestamp("UPDATED_AT").defaultNow().$onUpdate(() => new Date()),
}

export const user = pgTable("APP_USER", {
  openId: text("OPEN_ID").unique(),
  username: text("USERNAME"),
  email: text("EMAIL"),
  data: json("DATA").$type<UserData>(),
  ...defaultColumns,
})