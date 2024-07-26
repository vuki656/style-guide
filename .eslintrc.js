/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    extends: [
        "./src/eslint/configs/core.js",
        "./src/eslint/configs/node.js",
        "./src/eslint/configs/mobx.js",
        "./src/eslint/configs/react.js",
        "./src/eslint/configs/next.js",
    ],
    ignorePatterns: ["node_modules"],
    overrides: [
        {
            extends: ["./src/eslint/configs/react-typescript.js"],
            files: ["*.ts", ".js"],
        },
        {
            extends: ["./src/eslint/configs/jest.js"],
            files: ["*.test.ts", "*.test.js"],
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    root: true,
}
