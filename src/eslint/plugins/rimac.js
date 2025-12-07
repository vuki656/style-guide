import plugin from "@rimac-technology/eslint-plugin"

/** @type {import("@eslint/config-helpers").Config} */
export const rimac = {
    plugins: {
        "@rimac-technology": plugin,
    },
    rules: {
        "@rimac-technology/class-element-sorting": "error",
        "@rimac-technology/document-todos": ["error", { url: "http" }],
    },
}
