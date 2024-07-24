/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    ignorePatterns: ["node_modules"],
    extends: [
        "./src/eslint/configs/core.js",
        "./src/eslint/configs/node.js",
        "./src/eslint/configs/mobx.js",
        "./src/eslint/configs/react.js",
        "./src/eslint/configs/next.js",
    ],
    parserOptions: {
        project: "./tsconfig.json",
    },
    overrides: [
        {
            files: ["*.ts", ".js"],
            extends: ["./src/eslint/configs/react-typescript.js"],
        },
        {
            files: ["*.test.ts", "*.test.js"],
            extends: ["./src/eslint/configs/jest.js"],
        },
    ],
}
