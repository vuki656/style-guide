import tanstackQueryPlugin from "@tanstack/eslint-plugin-query"

/** @type {import("@eslint/config-helpers").Config} */
export const tanstackQuery = {
    plugins: {
        "@tanstack/query": tanstackQueryPlugin,
    },
    rules: {
        "@tanstack/query/exhaustive-deps": "error",
        "@tanstack/query/no-rest-destructuring": "error",
        "@tanstack/query/stable-query-client": "error",
    },
}
