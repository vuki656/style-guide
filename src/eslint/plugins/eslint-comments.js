import eslintComments from "@eslint-community/eslint-plugin-eslint-comments"

const plugin = {
    plugins: {
        "@eslint-community/eslint-comments": eslintComments,
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

export default plugin
