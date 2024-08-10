/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    ignorePatterns: ["node_modules"],
    overrides: [
        {
            extends: [
                "./src/eslint/configs/core.js",
                "./src/eslint/configs/node.js",
                "./src/eslint/configs/mobx.js",
                "./src/eslint/configs/react.js",
                "./src/eslint/configs/next.js",
            ],
            files: ["*.js", ".ts", ".*.cjs", "*.tsx"],
        },
        {
            extends: [
                "./src/eslint/configs/typescript.js",
                "./src/eslint/configs/typescript-strict.js",
            ],
            files: ["*.ts", "*.tsx"],
        },
        {
            extends: ["./src/eslint/configs/jest.js"],
            files: ["*.test.ts", "*.test.js"],
        },
        {
            extends: ["./src/graphql/configs/core.js"],
            files: ["*.graphql"],
            parser: "@graphql-eslint/eslint-plugin",
            parserOptions: {
                project: "./tsconfig.json",
                schema: "./**/*.graphql",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2024,
        project: "./tsconfig.json",
    },
    root: true,
}
