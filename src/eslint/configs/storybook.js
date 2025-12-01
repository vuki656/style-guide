const storybookPlugin = require("../plugins/storybook.js")

module.exports = [
    storybookPlugin,
    {
        rules: {
            "no-console": "off",
            "react-hooks/rules-of-hooks": "off",
            "react/no-array-index-key": "off",
            "security-node/detect-crlf": "off",
            "unicorn/consistent-function-scoping": "off",
        },
    },
]
