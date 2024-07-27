/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["simple-import-sort"],
    rules: {
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
    },
}
