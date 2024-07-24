/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["mobx"],
    rules: {
        "mobx/exhaustive-make-observable": "error",
        "mobx/missing-make-observable": "error",
        "mobx/unconditional-make-observable": "error",
    },
}
