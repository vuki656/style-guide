import plugin from "@eslint-community/eslint-plugin-eslint-comments"

export const eslintComments = {
    plugins: {
        "@eslint-community/eslint-comments": plugin,
    },
    rules: {
        "@eslint-community/eslint-comments/no-aggregating-enable": "error",
        "@eslint-community/eslint-comments/no-duplicate-disable": "error",
        "@eslint-community/eslint-comments/no-unlimited-disable": "error",
        "@eslint-community/eslint-comments/no-unused-disable": "error",
        "@eslint-community/eslint-comments/no-unused-enable": "error",
        "@eslint-community/eslint-comments/require-description": "error",
    },
}
