import { packageJson as packageJsonRules } from "../plugins/package-json.js"

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
