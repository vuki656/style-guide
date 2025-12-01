const { defineConfig, globalIgnores } = require("eslint/config")
const tseslint = require("typescript-eslint")

const core = require("./src/eslint/configs/core.js")
const node = require("./src/eslint/configs/node.js")
const mobx = require("./src/eslint/configs/mobx.js")
const react = require("./src/eslint/configs/react.js")
const next = require("./src/eslint/configs/next.js")
const typescript = require("./src/eslint/configs/typescript.js")
const typescriptStrict = require("./src/eslint/configs/typescript-strict.js")
const jest = require("./src/eslint/configs/jest.js")
const vitest = require("./src/eslint/configs/vitest.js")
const playwright = require("./src/eslint/configs/playwright.js")

module.exports = defineConfig(
    globalIgnores(["node_modules", "**/*.graphql"]),
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
