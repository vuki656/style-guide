import { packageJson as packageJsonRules } from "../plugins/package-json.js"

const DEFAULT_WORKSPACE_PATTERNS = ["**/packages/**/package.json", "**/apps/**/package.json"]

export const packageJsonConfigs = [packageJsonRules]

/**
 * Package.json ESLint configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 * @returns {import("@eslint/config-helpers").ConfigWithExtends}
 */
export function packageJson(config) {
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...packageJsonConfigs, ...(extendsConfig ?? [])],
        files: onlyFiles ?? ["**/package.json", ...(files ?? [])],
        ...rest,
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
    const {
        extends: extendsConfig,
        files,
        workspacePatterns = DEFAULT_WORKSPACE_PATTERNS,
        ...rest
    } = config ?? {}

    return [
        {
            extends: [...packageJsonConfigs, ...(extendsConfig ?? [])],
            files: ["package.json", ...(files ?? [])],
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
