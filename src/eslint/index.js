// @ts-nocheck
import { defineConfig, globalIgnores } from "eslint/config"

/**
 * Custom wrapper for ESLint defineConfig with simplified API
 *
 * @param {string[]} ignores - Paths to ignore
 * @param {Array} configs - Array of ESLint config objects
 * @returns {Array} ESLint configuration
 */
export function customDefineConfig(ignores, configs = []) {
    return defineConfig(
        globalIgnores([
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
            ...ignores,
        ]),
        ...configs,
    )
}

export * from "./configs/aws.js"
export * from "./configs/core.js"
export * from "./configs/jest.js"
export * from "./configs/mobx.js"
export * from "./configs/next.js"
export * from "./configs/node.js"
export * from "./configs/package-json.js"
export * from "./configs/playwright.js"
export * from "./configs/react.js"
export * from "./configs/storybook.js"
export * from "./configs/typescript.js"
export * from "./configs/typescript-strict.js"
export * from "./configs/vitest.js"
