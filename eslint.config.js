const tseslint = require("typescript-eslint")
const { eslint } = require("./src/eslint/plugins/eslint")
const { eslintComments } = require("./src/eslint/plugins/eslint-comments")
const { etc } = require("./src/eslint/plugins/etc")

module.exports = tseslint.config(eslint, eslintComments, etc, {
    languageOptions: {
        parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
            project: "./tsconfig.json",
        },
    },
})
