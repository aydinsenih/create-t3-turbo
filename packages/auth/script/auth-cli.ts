/**
 * @fileoverview Better Auth CLI Configuration
 *
 * This file is used exclusively by the Better Auth CLI to generate database schemas.
 * DO NOT USE THIS FILE DIRECTLY IN YOUR APPLICATION.
 *
 * WARNING: The auth-schema.ts file has been manually customized to use UUID types.
 * DO NOT run the generate command as it will overwrite the UUID types with text types.
 * The Better Auth CLI does not support generating UUID schemas - the schema must be maintained manually.
 *
 * Original CLI command (DO NOT RUN):
 * `pnpx @better-auth/cli generate --config script/auth-cli.ts --output ../db/src/auth-schema.ts`
 *
 * For actual authentication usage, import from "../src/index.ts" instead.
 */

import { initAuth } from "../src/index";

/**
 * CLI-only authentication configuration for schema generation.
 *
 * @warning This configuration is NOT intended for runtime use.
 * @warning Use the main auth configuration from "../src/index.ts" for your application.
 */
export const auth = initAuth({
  baseUrl: "http://localhost:3000",
  productionUrl: "http://localhost:3000",
  secret: "secret",
  discordClientId: "1234567890",
  discordClientSecret: "1234567890",
});
