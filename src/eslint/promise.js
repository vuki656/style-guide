/** @type {import("@types/eslint").Linter.FlatConfig} */
export const eslintPluginPromiseRules = {
    rules: {
        "promise/always-return": [
            "error",
            {
                ignoreLastCallback: true,
            },
        ],
        "promise/catch-or-return": [
            "error",
            {
                allowFinally: true,
            },
        ],
        "promise/no-callback-in-promise": "error",
        "promise/no-multiple-resolved": "error",
        "promise/no-nesting": "error",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/prefer-await-to-callbacks": "error",
        "promise/valid-params": "error",
    },
}
