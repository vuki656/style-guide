/** @type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
    plugins: ["jest-formatting"],
    rules: {
        "jest-formatting/padding-around-after-all-blocks": "error",
        "jest-formatting/padding-around-after-each-blocks": "error",
        "jest-formatting/padding-around-before-all-blocks": "error",
        "jest-formatting/padding-around-before-each-blocks": "error",
        "jest-formatting/padding-around-describe-blocks": "error",
        "jest-formatting/padding-around-expect-groups": "error",
        "jest-formatting/padding-around-test-blocks": "error",
    },
}
