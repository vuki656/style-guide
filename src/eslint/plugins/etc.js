/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["etc"],
    rules: {
        "etc/no-assign-mutated-array": "error",
        "etc/no-commented-out-code": "error",
        "etc/no-deprecated": "error",
        "etc/no-enum": "error",
        "etc/no-internal": "error",
        "etc/no-t": "error",
        "etc/throw-error": "error",
    },
}
