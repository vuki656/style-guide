import { ALL_JS_TS_FILES } from "../file-patterns.js"
import { next as nextPlugin } from "../plugins/next.js"

export const nextConfig = [nextPlugin]

/**
 * Next.js framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function next(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...nextConfig, ...(extendsConfig ?? [])],
        files: files ?? [...ALL_JS_TS_FILES, "**/*.jsx", ...(additionalFiles ?? [])],
        ...rest,
    }
}
