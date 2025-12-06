import { mobx as mobxPlugin } from "../plugins/mobx.js"

export const mobxConfig = [mobxPlugin]

/**
 * MobX state management configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function mobx(config) {
    return {
        extends: [...mobxConfig, ...(config?.extends ?? [])],
        files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
        ...config,
    }
}
