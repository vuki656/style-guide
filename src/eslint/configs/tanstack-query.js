import { ALL_JS_TS_FILES } from "../file-patterns.js"
import { tanstackQuery as tanstackQueryPlugin } from "../plugins/tanstack-query.js"

export const tanstackQueryConfig = [tanstackQueryPlugin]

/**
 * TanStack Query configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function tanstackQuery(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...tanstackQueryConfig, ...(extendsConfig ?? [])],
        files: files ?? [...ALL_JS_TS_FILES, "**/*.jsx", ...(additionalFiles ?? [])],
        ...rest,
    }
}
