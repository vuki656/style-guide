import { ALL_JS_TS_FILES } from "../file-patterns.js"
import { noBarrels as noBarrelsPlugin } from "../plugins/no-barrels.js"

export const noBarrelsConfig = [noBarrelsPlugin]

/**
 * Rejects aggregate barrel imports and current-directory barrel imports
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function noBarrels(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...noBarrelsConfig, ...(extendsConfig ?? [])],
        files: files ?? [...ALL_JS_TS_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
