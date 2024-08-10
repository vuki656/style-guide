/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["@rimac-technology"],
    rules: {
        "@rimac-technology/class-element-sorting": "error",
        "@rimac-technology/document-todos": ["error", { url: "http" }],
    },
}
