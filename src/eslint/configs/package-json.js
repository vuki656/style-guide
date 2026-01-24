import { packageJson as packageJsonRules } from "../plugins/package-json.js"

const DEFAULT_WORKSPACE_PATTERNS = ["**/packages/**/package.json", "**/apps/**/package.json"]

export const packageJsonConfigs = [packageJsonRules]

/**
 * Package.json ESLint configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config]
 * @returns {import("@eslint/config-helpers").ConfigWithExtends}
 */
export function packageJson(config) {
    return {
        extends: [...packageJsonConfigs, ...(config?.extends ?? [])],
        files: ["**/package.json"],
        ...config,
    }
}

/**
 * Package.json ESLint configuration for monorepos
 *
 * Returns two configs:
 *
 * - Root package.json: all rules including volta.node requirement
 * - Nested packages: same rules but no volta.node requirement
 *
 * @param {{ workspacePatterns?: string[] } & import("@eslint/config-helpers").ConfigWithExtends} [config]
 * @returns {import("@eslint/config-helpers").ConfigWithExtends[]}
 */
export function packageJsonWorkspace(config) {
    const { workspacePatterns = DEFAULT_WORKSPACE_PATTERNS, ...rest } = config ?? {}

    return [
        {
            extends: [...packageJsonConfigs, ...(rest?.extends ?? [])],
            files: ["package.json"],
            ...rest,
        },
        {
            extends: [...packageJsonConfigs],
            files: workspacePatterns,
            rules: {
                "dvukovic/require-properties": "off",
            },
        },
    ]
}
