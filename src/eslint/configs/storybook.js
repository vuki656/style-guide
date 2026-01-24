import { storybook as storybookPlugin } from "../plugins/storybook.js"

/**
 * Storybook ESLint configuration with relaxed rules for story files
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function storybook(config) {
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

    return {
        extends: [...storybookConfig, ...(config?.extends ?? [])],
        files: ["**/*.stories.js", "**/*.stories.ts", "**/*.stories.jsx", "**/*.stories.tsx"],
        ...config,
    }
}
