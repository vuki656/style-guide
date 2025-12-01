const typescriptSortKeys = require("eslint-plugin-typescript-sort-keys")

module.exports = {
    plugins: {
        "typescript-sort-keys": typescriptSortKeys,
    },
    rules: {
        "typescript-sort-keys/interface": "error",
        "typescript-sort-keys/string-enum": "error",
    },
}
