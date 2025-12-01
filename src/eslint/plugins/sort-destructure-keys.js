const sortDestructureKeys = require("eslint-plugin-sort-destructure-keys")

module.exports = {
    plugins: {
        "sort-destructure-keys": sortDestructureKeys,
    },
    rules: {
        "sort-destructure-keys/sort-destructure-keys": "error",
    },
}
