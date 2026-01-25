import { storybook as storybookPlugin } from "../plugins/storybook.js"

/**
 * Storybook ESLint configuration with relaxed rules for story files
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
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
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...storybookConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? [
            "**/*.stories.js",
            "**/*.stories.ts",
            "**/*.stories.jsx",
            "**/*.stories.tsx",
            ...(files ?? []),
        ],
        ...rest,
    }
}
