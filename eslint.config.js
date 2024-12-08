// const tsParser = require("@typescript-eslint/parser")
// const { eslint } = require("./src/eslint/plugins/eslint")
//
// /** @type {import("eslint").Linter.Config} */
// module.exports = [
//     ...eslint.map((config) => {
//         return {
//             ...config,
//             files: ["**/*.js"],
//         }
//     }),
//     {
//         files: ["**/*.ts", "**/*.js"],
//         languageOptions: {
//             parser: tsParser,
//             ecmaVersion: 2020,
//             sourceType: "module",
//         },
//     },
// ]

const tseslint = require("typescript-eslint")
const { eslint } = require("./src/eslint/plugins/eslint")
const { eslintComments } = require("./src/eslint/plugins/eslint-comments")

module.exports = tseslint.config(eslint, eslintComments, {
    languageOptions: {
        parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
        },
    },
})
