import { jest as jestPlugin } from "../plugins/jest.js"

export const jestConfig = [jestPlugin]

/**
 * Jest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function jest(config) {
    return {
        extends: [...jestConfig, ...(config?.extends ?? [])],
        files: [
            "**/*.test.js",
            "**/*.test.ts",
            "**/*.spec.js",
            "**/*.spec.ts",
            "**/*.unit.test.js",
            "**/*.unit.test.ts",
            "**/*.int.test.js",
            "**/*.int.test.ts",
            "**/*.integration.test.js",
            "**/*.integration.test.ts",
        ],
        ...config,
    }
}
