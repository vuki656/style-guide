import { react as reactPlugin } from "../plugins/react.js"
import { reactHooks as reactHooksPlugin } from "../plugins/react-hooks.js"

export const reactConfig = [reactPlugin, reactHooksPlugin]

/**
 * React framework configuration
 *
 * @param {import("@eslint/config-helpers").ConfigWithExtends} [config] - Additional config
 * @returns {import("@eslint/config-helpers").ConfigWithExtends} ESLint config
 */
export function react(config) {
    const { extends: extendsConfig, files, ...rest } = config ?? {}

    return {
        extends: [...reactConfig, ...(extendsConfig ?? [])],
        files: ["**/*.jsx", "**/*.tsx", ...(files ?? [])],
        ...rest,
    }
}
