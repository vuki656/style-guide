import storybookPlugin from "../plugins/storybook.js"

const storybookConfig = [
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

export default storybookConfig
