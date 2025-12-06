import tseslint from "typescript-eslint"

import { typescriptEslint as typescriptEslintPlugin } from "../plugins/typescript-eslint.js"
import { typescriptSortKeys as typescriptSortKeysPlugin } from "../plugins/typescript-sort-keys.js"

export const typescriptConfig = [
    {
        files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.cjs"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                project: "./tsconfig.json",
            },
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        ...typescriptEslintPlugin,
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        ...typescriptSortKeysPlugin,
    },
]

/**
 * TypeScript ESLint configuration with parser setup and rules
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function typescript(config) {
    return {
        extends: [...typescriptConfig, ...(config?.extends ?? [])],
        files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.cts", "**/*.mts"],
        ...config,
    }
}
