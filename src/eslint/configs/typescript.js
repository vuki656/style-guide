import tseslint from "typescript-eslint"

import { typescriptEslint } from "../plugins/typescript-eslint.js"
import { typescriptSortKeys } from "../plugins/typescript-sort-keys.js"

/** @type {import("eslint").Linter.Config[]} */
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
        ...typescriptEslint,
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        ...typescriptSortKeys,
    },
]

/**
 * TypeScript ESLint configuration with parser setup and rules
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function typescript(config) {
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...typescriptConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? [
            "**/*.js",
            "**/*.ts",
            "**/*.tsx",
            "**/*.cjs",
            "**/*.cts",
            "**/*.mts",
            ...(files ?? []),
        ],
        ...rest,
    }
}
