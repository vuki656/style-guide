import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

import core from "./src/eslint/configs/core.js"
import jest from "./src/eslint/configs/jest.js"
import mobx from "./src/eslint/configs/mobx.js"
import next from "./src/eslint/configs/next.js"
import node from "./src/eslint/configs/node.js"
import playwright from "./src/eslint/configs/playwright.js"
import react from "./src/eslint/configs/react.js"
import typescript from "./src/eslint/configs/typescript.js"
import typescriptStrict from "./src/eslint/configs/typescript-strict.js"
import vitest from "./src/eslint/configs/vitest.js"

export default defineConfig(
    globalIgnores(["node_modules"]),
    core,
    node,
    mobx,
    react,
    next,
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
        extends: [typescript, typescriptStrict],
        files: ["**/*.ts", "**/*.tsx"],
    },
    {
        extends: [jest, vitest, playwright],
        files: ["**/*.test.ts", "**/*.test.js"],
    },
)
