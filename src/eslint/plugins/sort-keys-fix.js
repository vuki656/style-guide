const sortKeysFix = require("eslint-plugin-sort-keys-fix")

module.exports = {
    plugins: {
        "sort-keys-fix": sortKeysFix,
    },
    rules: {
        "sort-keys-fix/sort-keys-fix": "error",
    },
}
