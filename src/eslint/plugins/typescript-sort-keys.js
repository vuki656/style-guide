import typescriptSortKeys from "eslint-plugin-typescript-sort-keys"

const plugin = {
    plugins: {
        "typescript-sort-keys": typescriptSortKeys,
    },
    rules: {
        "typescript-sort-keys/interface": "error",
        "typescript-sort-keys/string-enum": "error",
    },
}

export default plugin
