import { jest as jestPlugin } from "../plugins/jest.js"

/**
 * Jest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function jest(config) {
    const jestConfig = [jestPlugin]
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...jestConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? [
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
