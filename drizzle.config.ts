import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
    // The turso dialect requires a token; libSQL ignores it for file: URLs, so a
    // placeholder keeps local `db:push` working without a real Turso token.
    authToken: process.env.TURSO_AUTH_TOKEN || "local",
  },
});
