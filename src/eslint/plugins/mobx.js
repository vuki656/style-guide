import mobx from "eslint-plugin-mobx"

const plugin = {
    plugins: {
        mobx,
    },
    rules: {
        "mobx/exhaustive-make-observable": "error",
        "mobx/missing-make-observable": "error",
        "mobx/unconditional-make-observable": "error",
    },
}

export default plugin
