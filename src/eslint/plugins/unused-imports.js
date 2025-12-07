import plugin from "eslint-plugin-unused-imports"

/** @type {import("@eslint/config-helpers").Config} */
export const unusedImports = {
    plugins: {
        "unused-imports": plugin,
    },
    rules: {
        "unused-imports/no-unused-imports": "error",
    },
}
