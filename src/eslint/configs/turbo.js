import { ALL_JS_TS_FILES } from "../file-patterns.js"
import { turbo as turboPlugin } from "../plugins/turbo.js"

export const turboConfig = [turboPlugin]

/**
 * Turbo monorepo configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function turbo(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...turboConfig, ...(extendsConfig ?? [])],
        files: files ?? [...ALL_JS_TS_FILES, "**/*.jsx", ...(additionalFiles ?? [])],
        ...rest,
    }
}
