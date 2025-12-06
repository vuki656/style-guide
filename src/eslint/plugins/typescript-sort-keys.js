import plugin from "eslint-plugin-typescript-sort-keys"

export const typescriptSortKeys = {
    plugins: {
        "typescript-sort-keys": plugin,
    },
    rules: {
        "typescript-sort-keys/interface": "error",
        "typescript-sort-keys/string-enum": "error",
    },
}


