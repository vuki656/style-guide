import { mobx as mobxPlugin } from "../plugins/mobx.js"

export const mobxConfig = [mobxPlugin]

/**
 * MobX state management configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { additionalFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function mobx(config) {
    const { additionalFiles, extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...mobxConfig, ...(extendsConfig ?? [])],
        files: files ?? ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx", ...(additionalFiles ?? [])],
        ...rest,
    }
}
