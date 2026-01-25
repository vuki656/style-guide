import { baseline } from "../plugins/baseline.js"
import { dvukovic } from "../plugins/dvukovic.js"
import { eslint } from "../plugins/eslint.js"
import { eslintComments } from "../plugins/eslint-comments.js"
import { importX } from "../plugins/import-x.js"
import { promise } from "../plugins/promise.js"
import { rimac } from "../plugins/rimac.js"
import { simpleImportSort } from "../plugins/simple-import-sort.js"
import { sonarjs } from "../plugins/sonarjs.js"
import { sortDestructureKeys } from "../plugins/sort-destructure-keys.js"
import { sortKeysFix } from "../plugins/sort-keys-fix.js"
import { stylistic } from "../plugins/stylistic.js"
import { unicorn } from "../plugins/unicorn.js"
import { unusedImports } from "../plugins/unused-imports.js"

export const coreConfig = [
    baseline,
    eslint,
    eslintComments,
    importX,
    promise,
    rimac,
    simpleImportSort,
    sonarjs,
    sortDestructureKeys,
    sortKeysFix,
    stylistic,
    unicorn,
    unusedImports,
    dvukovic,
]

/**
 * Core ESLint configuration with essential rules and plugins
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function core(config) {
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...coreConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? [
            "**/*.js",
            ".*.js",
            "**/*.cjs",
            "**/*.mjs",
            "**/*.ts",
            "**/*.tsx",
            ...(files ?? []),
        ],
        ...rest,
    }
}
