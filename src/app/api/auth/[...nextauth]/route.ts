import { handlers } from "@/auth";

// libSQL/Drizzle need the Node runtime.
export const runtime = "nodejs";

export const { GET, POST } = handlers;
