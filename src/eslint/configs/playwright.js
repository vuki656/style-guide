import { TEST_FILES } from "../file-patterns.js"
import { playwright as playwrightPlugin } from "../plugins/playwright.js"

export const playwrightConfig = [playwrightPlugin]

/**
 * Playwright testing configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function playwright(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...playwrightConfig, ...(extendsConfig ?? [])],
        files: files ?? [...TEST_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
