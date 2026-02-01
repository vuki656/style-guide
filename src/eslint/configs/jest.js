import { TEST_FILES } from "../file-patterns.js"
import { jest as jestPlugin } from "../plugins/jest.js"

/**
 * Jest testing framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function jest(config) {
    const jestConfig = [jestPlugin]
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...jestConfig, ...(extendsConfig ?? [])],
        files: files ?? [...TEST_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
