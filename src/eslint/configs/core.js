/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    extends: [
        "../plugins/eslint.js",
        "../plugins/eslint-comments.js",
        "../plugins/promise.js",
        "../plugins/unicorn.js",
        "../plugins/unused-imports.js",
        "../plugins/import-x.js",
        "../plugins/sonarjs.js",
        "../plugins/etc.js",
        "../plugins/sort-keys-fix.js",
        "../plugins/sort-destructure-keys.js",
        "../plugins/stylistic.js",
        "../plugins/simple-import-sort.js",
        "../plugins/rimac.js",
    ],
}
