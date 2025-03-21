/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    extends: ["../plugins/storybook"],
    rules: {
        "no-console": "off",
        "react-hooks/rules-of-hooks": "off",
        "unicorn/consistent-function-scoping": "off",
    },
}
