const mobx = require("eslint-plugin-mobx")

module.exports = {
    plugins: {
        mobx,
    },
    rules: {
        "mobx/exhaustive-make-observable": "error",
        "mobx/missing-make-observable": "error",
        "mobx/unconditional-make-observable": "error",
    },
}
