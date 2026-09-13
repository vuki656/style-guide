import { playwright as playwrightPlugin } from "../plugins/playwright.js"

const PLAYWRIGHT_FILES = [
    "**/*.e2e.ts",
    "**/*.e2e.js",
    "**/*.page.ts",
    "**/*.page.js",
    "**/e2e/**/*.ts",
    "**/e2e/**/*.js",
]

export const playwrightConfig = [
    playwrightPlugin,
    {
        rules: {
            "no-await-in-loop": "off",
        },
    },
]

/**
 * Playwright testing configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & {
 *     additionalFiles?: string[]
 *     assertFunctionNames?: string[]
 * }} [config]
 *   - Additional config. `assertFunctionNames` lists custom helpers that count as assertions for
 *       `playwright/expect-expect`.
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function playwright(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...playwrightConfig, ...(extendsConfig ?? [])],
        files: files ?? [...PLAYWRIGHT_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
