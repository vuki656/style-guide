import { vitest as vitestPlugin } from "../plugins/vitest.js"

export const vitestConfig = [vitestPlugin]

/**
 * Vitest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function vitest(config) {
    return {
        extends: [...vitestConfig, ...(config?.extends ?? [])],
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
