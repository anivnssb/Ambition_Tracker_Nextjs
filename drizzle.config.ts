import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./model/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
