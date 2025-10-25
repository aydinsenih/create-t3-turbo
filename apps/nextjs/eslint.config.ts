import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@atlas/eslint-config/base";
import { nextjsConfig } from "@atlas/eslint-config/nextjs";
import { reactConfig } from "@atlas/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
