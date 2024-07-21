import { eslintRules } from "./src/eslint/eslint.js"
import { typescriptEslintRules } from "./src/eslint/typescript-eslint.js"
import { eslintCommentsRules } from "./src/eslint/eslint-comments.js"

import typescriptEslintPlugin from "typescript-eslint"
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments"

import typescriptEslintParser from "@typescript-eslint/parser"
import ESLintPluginESLintCommentsConfigs from "@eslint-community/eslint-plugin-eslint-comments/configs"

export default typescriptEslintPlugin.config({
    rules: {
        ...eslintRules.rules,
        ...typescriptEslintRules.rules,
        ...eslintCommentsRules.rules,
    }, // TODO: should this be here or in plugin file
    plugins: {
        "@typescript-eslint": typescriptEslintPlugin.plugin,
        "@eslint-community/eslint-comments":
            ESLintPluginESLintCommentsConfigs.recommended.plugins[
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
