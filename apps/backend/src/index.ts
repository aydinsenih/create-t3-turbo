import type { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

import { createExpressTRPCMiddleware } from "@atlas/api";
import { initAuth } from "@atlas/auth";

const app: Application = express();

// Configure CORS first (before any handlers)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Initialize Better Auth
const auth = initAuth({
  baseUrl: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  productionUrl: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  secret: process.env.BETTER_AUTH_SECRET,
  discordClientId: process.env.AUTH_DISCORD_ID || "",
  discordClientSecret: process.env.AUTH_DISCORD_SECRET || "",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
});

// Health check endpoint
app.use("/health", (_, res) => {
  return res.json({ status: "OK" });
});

// Better Auth handler - MUST be mounted BEFORE express.json() middleware
// See: https://www.better-auth.com/docs/integrations/express
app.all("/api/auth/*", toNodeHandler(auth));

// tRPC Express middleware with auth context
const trpcExpress = createExpressTRPCMiddleware(auth);
app.use("/trpc", trpcExpress);

// Mount express.json() AFTER Better Auth and tRPC handlers
// or apply it only to routes that don't interact with them
app.use(express.json());

const port = process.env.BACKEND_PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`tRPC API available at http://localhost:${port}/trpc`);
  console.log(`Auth API available at http://localhost:${port}/api/auth`);
});

export default app;
