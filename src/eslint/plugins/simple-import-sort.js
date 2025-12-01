import simpleImportSort from "eslint-plugin-simple-import-sort"

const plugin = {
    plugins: {
        "simple-import-sort": simpleImportSort,
    },
    rules: {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
    },
}

export default plugin
