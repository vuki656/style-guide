import { playwright as playwrightPlugin } from "../plugins/playwright.js"

export const playwrightConfig = [playwrightPlugin]

/**
 * Playwright testing configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function playwright(config) {
    const { extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...playwrightConfig, ...(extendsConfig ?? [])],
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
