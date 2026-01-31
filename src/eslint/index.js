// @ts-nocheck
import { defineConfig, globalIgnores } from "eslint/config"

/**
 * Custom wrapper for ESLint defineConfig with simplified API
 *
 * @param {{ configs: Array; ignores?: string[]; defaultIgnores?: boolean }} options
 * @returns {Array} ESLint configuration
 */
export function customDefineConfig({ configs, defaultIgnores = true, ignores = [] }) {
    const defaultIgnorePatterns = defaultIgnores
        ? [
              "node_modules",
              "./*.js",
              "./*.ts",
              "./*.cjs",
              "./*.mjs",
              "./*.config.js",
              "./*.config.cjs",
              "./*.config.mjs",
              "next-env.d.ts",
              ".next",
              "**/__generated__/**",
              "**/*.d.json.ts",
          ]
        : []

    return defineConfig(globalIgnores([...defaultIgnorePatterns, ...ignores]), ...configs.flat())
}

export { aws } from "./configs/aws.js"
export { core } from "./configs/core.js"
export { jest } from "./configs/jest.js"
export { mobx } from "./configs/mobx.js"
export { next } from "./configs/next.js"
export { node } from "./configs/node.js"
export { packageJson, packageJsonWorkspace } from "./configs/package-json.js"
export { playwright } from "./configs/playwright.js"
export { react } from "./configs/react.js"
export { storybook } from "./configs/storybook.js"
export { typescript } from "./configs/typescript.js"
export { typescriptStrict } from "./configs/typescript-strict.js"
export { vitest } from "./configs/vitest.js"
