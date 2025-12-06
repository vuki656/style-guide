import { next as nextPlugin } from "../plugins/next.js"

export const nextConfig = [nextPlugin]

/**
 * Next.js framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function next(config) {
    return {
        extends: [...nextConfig, ...(config?.extends ?? [])],
        files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
        ...config,
    }
}
