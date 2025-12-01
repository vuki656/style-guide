const rimac = require("@rimac-technology/eslint-plugin")

module.exports = {
    plugins: {
        "@rimac-technology": rimac,
    },
    rules: {
        "@rimac-technology/class-element-sorting": "error",
        "@rimac-technology/document-todos": ["error", { url: "http" }],
    },
}
