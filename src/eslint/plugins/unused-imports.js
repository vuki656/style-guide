const unusedImports = require("eslint-plugin-unused-imports")

module.exports = {
    plugins: {
        "unused-imports": unusedImports,
    },
    rules: {
        "unused-imports/no-unused-imports": "error",
    },
}
