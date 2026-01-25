import { mobx as mobxPlugin } from "../plugins/mobx.js"

export const mobxConfig = [mobxPlugin]

/**
 * MobX state management configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends & { onlyFiles?: string[] }} [config]
 *   - Additional config
 *
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function mobx(config) {
    const { extends: extendsConfig, files, onlyFiles, ...rest } = config ?? {}

    return {
        extends: [...mobxConfig, ...(extendsConfig ?? [])],
        files: onlyFiles ?? ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx", ...(files ?? [])],
        ...rest,
    }
}
