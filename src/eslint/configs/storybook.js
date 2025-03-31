/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
    extends: ["../plugins/storybook"],
    rules: {
        "no-console": "off",
        "react-hooks/rules-of-hooks": "off",
        "react/no-array-index-key": "off",
        "security-node/detect-crlf": "off",
        "unicorn/consistent-function-scoping": "off",
    },
}
