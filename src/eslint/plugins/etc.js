/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["etc"],
    rules: {
        "etc/no-assign-mutated-array": "error",
        "etc/no-commented-out-code": "error",
        "etc/no-deprecated": "error",
        "etc/no-enum": "error",
        "etc/no-implicit-any-catch": "error",
        "etc/no-internal": "error",
        "etc/no-misused-generics": "error",
        "etc/no-t": "error",
        "etc/prefer-less-than": "error",
        "etc/throw-error": "error",
    },
}