import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./model/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: `mysql://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE}:${process.env.DATABASE_INTERNAL_PORT}/${process.env.DATABASE_NAME}`,
  },
});
