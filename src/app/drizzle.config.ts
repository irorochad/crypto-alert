import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.js",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
  },
});
