import plugin from "eslint-plugin-typescript-sort-keys"

/** @type {import("@eslint/config-helpers").Config} */
export const typescriptSortKeys = {
    plugins: {
        "typescript-sort-keys": plugin,
    },
    rules: {
        "typescript-sort-keys/interface": "error",
        "typescript-sort-keys/string-enum": "error",
    },
}
