import { eslintRules } from "./src/eslint/eslint.js"
import { typescriptEslintRules } from "./src/eslint/typescript-eslint.js"

import typescriptEslintPlugin from "typescript-eslint"
import typescriptEslintParser from "@typescript-eslint/parser"

export default typescriptEslintPlugin.config({
    rules: {
        ...eslintRules.rules,
        ...typescriptEslintRules.rules,
    },
    plugins: {
        '@typescript-eslint': typescriptEslintPlugin.plugin,
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
