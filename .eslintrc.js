/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    ignorePatterns: ['node_modules'],
    extends: [
        "./src/eslint/configs/core.js",
        "./src/eslint/configs/jest.js",
        "./src/eslint/configs/node.js",
    ],
    parserOptions: {
        project: "./tsconfig.json",
    },
}
