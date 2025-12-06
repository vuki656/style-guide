import plugin from "eslint-plugin-promise"

export const promise = {
    plugins: {
        promise: plugin,
    },
    rules: {
        "promise/always-return": "error",
        "promise/catch-or-return": "error",
        "promise/no-callback-in-promise": "error",
        "promise/no-multiple-resolved": "error",
        "promise/no-nesting": "error",
        "promise/no-new-statics": "error",
        "promise/no-promise-in-callback": "error",
        "promise/no-return-in-finally": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/valid-params": "error",
    },
}


