import plugin from "eslint-plugin-mobx"

export const mobx = {
    plugins: {
        mobx: plugin,
    },
    rules: {
        "mobx/exhaustive-make-observable": "error",
        "mobx/missing-make-observable": "error",
        "mobx/unconditional-make-observable": "error",
    },
}
