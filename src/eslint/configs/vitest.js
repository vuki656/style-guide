import { vitest as vitestPlugin } from "../plugins/vitest.js"

export const vitestConfig = [vitestPlugin]

/**
 * Vitest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function vitest(config) {
    const { extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...vitestConfig, ...(extendsConfig ?? [])],
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
            ...(files ?? []),
        ],
        ...rest,
    }
}
