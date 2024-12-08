const { recommended } = require("@eslint-community/eslint-plugin-eslint-comments/configs")

/** @type {import("eslint").Linter.Config} */
const eslintComments =  [
    {
        plugins: {
            "@eslint-community/eslint-comments": recommended.plugins['@eslint-community/eslint-comments'],
        },
        rules: {
            "@eslint-community/eslint-comments/disable-enable-pair": [
                "error",
                { allowWholeFile: true },
            ],
            "@eslint-community/eslint-comments/no-aggregating-enable": "error",
            "@eslint-community/eslint-comments/no-duplicate-disable": "error",
            "@eslint-community/eslint-comments/no-unlimited-disable": "error",
            "@eslint-community/eslint-comments/no-unused-disable": "error",
            "@eslint-community/eslint-comments/no-unused-enable": "error",
            "@eslint-community/eslint-comments/require-description": [
                "error",
                { ignore: [] },
            ],
        },
    },
];

module.exports = { eslintComments }
