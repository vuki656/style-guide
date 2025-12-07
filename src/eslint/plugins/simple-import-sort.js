import plugin from "eslint-plugin-simple-import-sort"

/** @type {import("@eslint/config-helpers").Config} */
export const simpleImportSort = {
    plugins: {
        "simple-import-sort": plugin,
    },
    rules: {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
    },
}
