import { defineConfig } from "eslint/config";

import { baseConfig } from "@atlas/eslint-config/base";
import { reactConfig } from "@atlas/eslint-config/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig,
);
