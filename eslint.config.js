import { eslintRules } from "./src/eslint/eslint.js"
import { eslintTypescriptRules } from "./src/eslint/typescript-eslint.js"
import { eslintCommentsRules } from "./src/eslint/eslint-comments.js"
import { eslintUnicornRules } from "./src/eslint/unicorn.js"
import { eslintPluginPromiseRules } from "./src/eslint/promise.js"
import { eslintPluginJestRules } from "./src/eslint/jest.js"
import { eslintPluginJestFormattingRules } from "./src/eslint/jest-formatting.js"

import typescriptEslintParser from "@typescript-eslint/parser"

import eslintPluginJestFormatting from "eslint-plugin-jest-formatting"
import typescriptEslintPlugin from "typescript-eslint"
import eslintPluginPromise from "eslint-plugin-promise"
import eslintPluginJest from "eslint-plugin-jest"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import eslintPluginEslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs"
import globals from "globals"

export default typescriptEslintPlugin.config({
    languageOptions: {
        globals: globals.builtin,
    },
    rules: {
        ...eslintRules.rules,
        ...eslintTypescriptRules.rules,
        ...eslintCommentsRules.rules,
        ...eslintUnicornRules.rules,
        ...eslintPluginPromiseRules.rules,
        ...eslintPluginJestRules.rules,
        ...eslintPluginJestFormattingRules.rules,
    }, // TODO: should this be here or in plugin file
    plugins: {
        "@typescript-eslint": typescriptEslintPlugin.plugin,
        unicorn: eslintPluginUnicorn,
        jest: eslintPluginJest,
        "jest-formatting": eslintPluginJestFormatting,
        promise: eslintPluginPromise,
        "@eslint-community/eslint-comments":
            eslintPluginEslintComments.recommended.plugins[
                "@eslint-community/eslint-comments"
            ],
    },
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
        parser: typescriptEslintParser,
        parserOptions: {
            ecmaVersion: 2024,
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
})
