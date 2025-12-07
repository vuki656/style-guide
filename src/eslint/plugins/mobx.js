import plugin from "eslint-plugin-mobx"

/** @type {import("@eslint/config-helpers").Config} */
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
