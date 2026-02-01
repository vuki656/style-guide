import { TEST_FILES } from "../file-patterns.js"
import { vitest as vitestPlugin } from "../plugins/vitest.js"

export const vitestConfig = [vitestPlugin]

/**
 * Vitest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function vitest(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...vitestConfig, ...(extendsConfig ?? [])],
        files: files ?? [...TEST_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
