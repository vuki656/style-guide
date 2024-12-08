const etcPlugin = require("eslint-plugin-etc")
const { fixupPluginRules } = require("@eslint/compat");

/** @type {import("eslint").Linter.Config} */
const etc = [
    {
        plugins: {
            etc: fixupPluginRules(etcPlugin),
        },
        rules: {
            "etc/no-assign-mutated-array": "error",
            "etc/no-commented-out-code": "error",
            "etc/no-deprecated": "error",
            "etc/no-enum": "error",
            "etc/no-internal": "error",
            "etc/no-t": "error",
            "etc/throw-error": "error",
        },
    },
]

module.exports = { etc }
