import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "reactflow/dist/style.css": fileURLToPath(new URL("./src/test/mocks/styleMock.js", import.meta.url)),
    },
  },
});
