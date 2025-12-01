const simpleImportSort = require("eslint-plugin-simple-import-sort")

module.exports = {
    plugins: {
        "simple-import-sort": simpleImportSort,
    },
    rules: {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
    },
}
