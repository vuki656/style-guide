/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    extends: [
        "../plugins/eslint.js",
        "../plugins/typescript-eslint.js",
        "../plugins/eslint-comments.js",
        "../plugins/promise.js",
        "../plugins/unicorn.js",
    ],
}
