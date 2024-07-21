import { eslintRules } from "./src/eslint/eslint.js"
import { typescriptEslintRules } from "./src/eslint/typescript-eslint.js"
import { eslintCommentsRules } from "./src/eslint/eslint-comments.js"
import { eslintUnicornRules } from "./src/eslint/unicorn.js"

import typescriptEslintParser from "@typescript-eslint/parser"

import typescriptEslintPlugin from "typescript-eslint"
import eslintPluginUnicorn from "eslint-plugin-unicorn"
import eslintPluginEslintComments from "@eslint-community/eslint-plugin-eslint-comments/configs"
import globals from "globals"

export default typescriptEslintPlugin.config({
    languageOptions: {
        globals: globals.builtin,
    },
    rules: {
        ...eslintRules.rules,
        ...typescriptEslintRules.rules,
        ...eslintCommentsRules.rules,
        ...eslintUnicornRules.rules,
    }, // TODO: should this be here or in plugin file
    plugins: {
        "@typescript-eslint": typescriptEslintPlugin.plugin,
        unicorn: eslintPluginUnicorn,
        "@eslint-community/eslint-comments":
            eslintPluginEslintComments.recommended.plugins[
                "@eslint-community/eslint-comments"
            ],
    },
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
        parser: typescriptEslintParser,
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
        },
    },
})
