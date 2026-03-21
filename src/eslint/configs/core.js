import { ALL_JS_TS_FILES } from "../file-patterns.js"
import { arrayFunction } from "../plugins/array-function.js"
import { baseline } from "../plugins/baseline.js"
import { dvukovic } from "../plugins/dvukovic.js"
import { eslintComments } from "../plugins/eslint-comments.js"
import { eslint } from "../plugins/eslint.js"
import { importX } from "../plugins/import-x.js"
import { perfectionist } from "../plugins/perfectionist.js"
import { promise } from "../plugins/promise.js"
import { sonarjs } from "../plugins/sonarjs.js"
import { stylistic } from "../plugins/stylistic.js"
import { unicorn } from "../plugins/unicorn.js"
import { unusedImports } from "../plugins/unused-imports.js"

export const coreConfig = [
    arrayFunction,
    baseline,
    eslint,
    eslintComments,
    importX,
    promise,
    perfectionist,
    sonarjs,
    stylistic,
    unicorn,
    unusedImports,
    dvukovic,
]

/**
 * Core ESLint configuration with essential rules and plugins
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function core(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...coreConfig, ...(extendsConfig ?? [])],
        files: files ?? [".*.js", ...ALL_JS_TS_FILES, ...(additionalFiles ?? [])],
        ...rest,
    }
}
